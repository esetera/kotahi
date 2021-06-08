const axios = require('axios')

const {
  ecologyAndSpillover,
  vaccines,
  nonPharmaceuticalInterventions,
  epidemiology,
  diagnostics,
  modeling,
  clinicalPresentation,
  pharmaceuticalInterventions,
} = require('./topics')

const getData = async ctx => {
  const dateTwoWeeksAgo =
    +new Date(new Date(Date.now()).toISOString().split('T')[0]) - 12096e5
  return
  const requests = async (cursor = 0, minDate, results = []) => {
    const { data } = await axios.get(`https://api.biorxiv.org/covid19/${cursor}`)


    const isDatesOutdated = data.collection.some(({rel_date}) => +new Date(rel_date) < minDate)

    if (isDatesOutdated) {
      const notOutdatedDates = data.collection.filter(({rel_date}) => +new Date(rel_date) > minDate)

      return results.concat(notOutdatedDates)
    } else {
      return requests(cursor + 30, minDate, results.concat(data.collection))
    }
  }

  const newManuscripts = await requests(0, dateTwoWeeksAgo, [])
  
  const manuscripts = await ctx.models.Manuscript.query()

  const currentDOIs = manuscripts.map(({ submission }) => {
    return submission.articleURL.split('.org/')[1]
  })

  const topics = {
    ecologyAndSpillover,
    vaccines,
    nonPharmaceuticalInterventions,
    epidemiology,
    diagnostics,
    modeling,
    clinicalPresentation,
    pharmaceuticalInterventions,
  }

  const withoutDuplicates = collection.filter(
    ({ rel_doi, version, rel_site }) =>
      currentDOIs.includes(
        `https://${rel_site.toLowerCase()}/${rel_doi}v${version}`,
      ),
  )

  const newManuscriptsAA = withoutDuplicates.map(
    ({ rel_doi, rel_site, version, rel_title, rel_abs }) => {
      const manuscriptTopics = Object.entries(topics)
        .filter(([topicName, topicKeywords]) => {
          console.log('topicKeywords', topicKeywords)
          return (
            !!topicKeywords[0].filter(keyword => rel_abs.includes(keyword))
              .length &&
            !!topicKeywords[1].filter(keyword => rel_abs.includes(keyword))
              .length
          )
        })
        .map(([topicName]) => topicName)

      return {
        status: 'new',
        submission: {
          articleURL: `https://${rel_site.toLowerCase()}/${rel_doi}v${version}`,
          articleDescription: rel_title,
          abstract: rel_abs,
          topics: manuscriptTopics[0],
        },
      }
    },
  )

  console.log(newManuscripts)
    return
  const inserted = await ctx.models.Manuscript.query().insert(newManuscripts)

  return inserted
}

module.exports = getData
