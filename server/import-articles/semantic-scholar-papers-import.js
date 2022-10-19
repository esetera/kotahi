/* eslint-disable camelcase, consistent-return */
const axios = require('axios')
const config = require('config')
const { map } = require('lodash')
const models = require('@pubsweet/models')
const ArticleImportHistory = require('../model-article-import-history/src/articleImportHistory')
const ArticleImportSources = require('../model-article-import-sources/src/articleImportSources')

const {
  getLastImportDate,
  getEmptySubmission,
  rawAbstractToSafeHtml,
} = require('./importTools')

const SAVE_CHUNK_SIZE = 50

const getData = async ctx => {
  const [checkIfSourceExists] = await ArticleImportSources.query().where({
    server: 'semantic-scholar',
  })

  if (!checkIfSourceExists) {
    await ArticleImportSources.query().insert({
      server: 'semantic-scholar',
    })
  }

  const [
    semanticScholarImportSourceId,
  ] = await ArticleImportSources.query().where({
    server: 'semantic-scholar',
  })

  const sourceId = semanticScholarImportSourceId.id

  const imports = []

  const lastImportDate = await getLastImportDate(sourceId)

  const manuscripts = await models.Manuscript.query()

  const selectedManuscripts = manuscripts.filter(
    manuscript => manuscript.submission.labels,
  )

  if (selectedManuscripts.length > 0) {
    const importDOIParams = []
    selectedManuscripts.map(manuscript => {
      const DOI = encodeURI(manuscript.submission.doi.split('.org/')[1])
      return importDOIParams.push(`DOI:${DOI}`)
    })

    const importParameters = JSON.stringify({
      positivePaperIds: importDOIParams,
      negativePaperIds: [],
    })

    const semanticSholarRequestUri =
      'https://api.semanticscholar.org/recommendations/v1/papers?limit=500&fields=url,venue,year,externalIds,title,abstract,authors'

    const { data } = await axios.post(
      semanticSholarRequestUri,
      importParameters,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (data) {
      Array.prototype.push.apply(imports, data.recommendedPapers)
    }

    const importsOnlyWithDOI = imports.filter(
      preprints => preprints.externalIds.DOI,
    )

    await fetchPublicationDatesFromEuropePmc(importsOnlyWithDOI)

    const importsForPastSixWeeks = importsOnlyWithDOI.filter(preprint => {
      if (preprint.firstPublicationDate) {
        const currentDate = new Date().toISOString().split('T')[0]

        const diffDays = Math.floor(
          (Date.parse(currentDate.replace(/-/g, '/')) -
            Date.parse(preprint.firstPublicationDate.replace(/-/g, '/'))) /
            (1000 * 60 * 60 * 24),
        )

        return (
          diffDays <
          Number(config.manuscripts.semanticScholarImportsRecencyPeriodDays)
        )
      }

      return false
    })

    const allowedPreprintServers = [
      'bioRxiv',
      'medRxiv',
      'Research Square',
      'ChemRxiv',
      'arXiv',
    ]

    const importsFromSpecificPreprintServers = importsForPastSixWeeks.filter(
      preprint => allowedPreprintServers.includes(preprint.preprintServer),
    )

    const currentDOIs = new Set(manuscripts.map(({ doi }) => doi))

    const currentURLs = new Set(
      manuscripts.map(
        ({ submission }) =>
          submission.articleURL || submission.link || submission.biorxivURL,
      ),
    )

    const withoutDOIDuplicates = importsFromSpecificPreprintServers.filter(
      preprints => !currentDOIs.has(preprints.externalIds.DOI),
    )

    const withoutUrlDuplicates = withoutDOIDuplicates.filter(
      preprints =>
        !currentURLs.has(`https://doi.org/${preprints.externalIds.DOI}`),
    )

    const emptySubmission = getEmptySubmission()

    const newManuscripts = withoutUrlDuplicates.map(
      ({
        doi,
        title,
        authors,
        abstract,
        date: datePublished,
        url,
        externalIds,
        firstPublicationDate,
        venue,
      }) => ({
        status: 'new',
        isImported: true,
        importSource: sourceId,
        importSourceServer: 'semantic-scholar',
        submission: {
          ...emptySubmission,
          firstAuthor: authors[0] ? authors[0].name : '',
          authors: authors.map(index => ({
            firstName: index.name.split(' ').slice(0, -1).join(' '),
            lastName: index.name.split(' ').slice(-1).join(' '),
          })),
          abstract: rawAbstractToSafeHtml(abstract),
          datePublished: firstPublicationDate,
          journal: venue,
          link: url,
          doi:
            externalIds && externalIds.DOI
              ? `https://doi.org/${externalIds.DOI}`
              : '',
        },
        // separate DOI field for better indexing, not including DOI prefix here
        doi: externalIds && externalIds.DOI ? externalIds.DOI : '',
        meta: {
          title,
          notes: [
            {
              notesType: 'fundingAcknowledgement',
              content: '',
            },
            {
              notesType: 'specialInstructions',
              content: '',
            },
          ],
        },
        submitterId: ctx.user,
        channels: [
          {
            topic: 'Manuscript discussion',
            type: 'all',
          },
          {
            topic: 'Editorial discussion',
            type: 'editorial',
          },
        ],
        files: [],
        reviews: [],
        teams: [],
      }),
    )

    if (!newManuscripts.length) return []

    try {
      const result = []

      for (let i = 0; i < newManuscripts.length; i += SAVE_CHUNK_SIZE) {
        const chunk = newManuscripts.slice(i, i + SAVE_CHUNK_SIZE)

        // eslint-disable-next-line no-await-in-loop
        const inserted = await models.Manuscript.query().upsertGraphAndFetch(
          chunk,
          { relate: true },
        )

        Array.prototype.push.apply(result, inserted)
      }

      if (lastImportDate > 0) {
        await ArticleImportHistory.query()
          .update({
            date: new Date().toISOString(),
          })
          .where({ sourceId })
      } else {
        await ArticleImportHistory.query().insert({
          date: new Date().toISOString(),
          sourceId,
        })
      }

      return result
    } catch (e) {
      console.error(e.message)
    }
  }
}

async function fetchPublicationDatesFromEuropePmc(importsOnlyWithDOI) {
  await Promise.all(
    map(importsOnlyWithDOI, async preprint => {
      const queryDoi = `DOI:${preprint.externalIds.DOI}`

      const params = {
        query: queryDoi,
        format: 'json',
      }

      let firstPublicationDate, preprintServer

      const response = await axios.get(
        `https://www.ebi.ac.uk/europepmc/webservices/rest/search`,
        {
          params,
        },
      )

      if (
        response.data.resultList.result[0] &&
        response.data.resultList.result[0].bookOrReportDetails
      ) {
        firstPublicationDate =
          response.data.resultList.result[0].firstPublicationDate
        preprintServer =
          response.data.resultList.result[0].bookOrReportDetails.publisher
      }

      return Object.assign(preprint, { firstPublicationDate, preprintServer })
    }),
  )
}

module.exports = getData
