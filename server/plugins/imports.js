/* eslint-disable global-require, no-console, import/no-dynamic-require, no-await-in-loop, no-continue */

const models = require('@pubsweet/models')
const { chunk } = require('lodash')

const importWorkersByGroup = {}

const runImports = async (groupId, submitterId = null) => {
  const importType = submitterId ? 'manual' : 'automatic'
  const urisAlreadyImporting = []
  const doisAlreadyImporting = []
  const importWorkers = importWorkersByGroup[groupId] || []

  const saveImportedManuscripts = async allNewManuscripts => {
    try {
      const chunks = chunk(allNewManuscripts, 10)

      // eslint-disable-next-line no-restricted-syntax
      for (const chunkUnit of chunks) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of chunkUnit) {
          if (Array.isArray(item)) {
            let parentManuscript

            // eslint-disable-next-line no-restricted-syntax
            for (const preprint of item) {
              if (parentManuscript) {
                const preprintWithParent = {
                  ...preprint,
                  parentId: parentManuscript.id,
                }

                delete parentManuscript.channels

                const newVersion = await models.Manuscript.query().upsertGraphAndFetch(
                  preprintWithParent,
                  {
                    relate: true,
                  },
                )

                console.log('versionData', newVersion)
              } else
                parentManuscript = await models.Manuscript.query().upsertGraphAndFetch(
                  preprint,
                  {
                    relate: true,
                  },
                )
            }
          } else {
            await models.Manuscript.query().upsertGraphAndFetch(item, {
              relate: true,
            })
          }
        }
      }
    } catch (e) {
      console.error(e)
    }

    console.info(
      `Imported ${allNewManuscripts.length} manuscripts into group ${groupId} using plugins, with ${submitterId} as submitterId.`,
    )
  }

  for (let i = 0; i < importWorkers.length; i += 1) {
    const allNewManuscripts = []
    const worker = importWorkers[i]
    if (![importType, 'any'].includes(worker.importType)) continue

    console.info(`Importing manuscripts using plugin ${worker.name}`)
    let importSource, lastImportDate

    try {
      let [sourceRecord] = await models.ArticleImportSources.query().where({
        server: worker.name,
      })
      if (!sourceRecord)
        sourceRecord = await models.ArticleImportSources.query().insertAndFetch(
          {
            server: worker.name,
          },
        )
      importSource = sourceRecord.id

      const lastImportRecord = await models.ArticleImportHistory.query()
        .select('date')
        .findOne({ sourceId: importSource, groupId })

      lastImportDate = lastImportRecord ? lastImportRecord.date : null
    } catch (error) {
      console.error(
        `Failed to query sourceId and lastImportDate for plugin ${worker.name} on group ${groupId}. Skipping.`,
      )
      console.error(error)
      continue
    }

    let newManuscripts

    try {
      newManuscripts = await worker.doImport({
        urisAlreadyImporting: [...urisAlreadyImporting],
        doisAlreadyImporting: [...doisAlreadyImporting],
        lastImportDate: lastImportDate ? new Date(lastImportDate) : null,
      })
    } catch (error) {
      console.error(
        `Import plugin ${worker.name} failed on group ${groupId}. Skipping.`,
      )
      console.error(error)
      continue
    }

    if (!Array.isArray(newManuscripts))
      throw new Error(
        `Expected ${worker.name} import function to return an array of manuscripts, but received ${newManuscripts}`,
      )
    console.info(
      `Found ${newManuscripts.length} new manuscripts for group ${groupId}.`,
    )

    // eslint-disable-next-line no-loop-func
    newManuscripts.forEach(manuscriptData => {
      // Ensure that you are working with an array, if not convert to an array with a single element

      let uri, doi

      if (Array.isArray(manuscriptData)) {
        const versions = []
        manuscriptData.forEach(preprint => {
          uri =
            preprint.submission.link ||
            preprint.submission.biorxivURL ||
            preprint.submission.url ||
            preprint.submission.uri
          doi = preprint.doi
          versions.push({
            submission: {},
            meta: { title: '' },
            importSourceServer: null,
            ...preprint,
            status: 'new',
            isImported: true,
            importSource,
            submitterId,
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
            teams: [],
            groupId,
          })
        })
        allNewManuscripts.push(versions)
      } else {
        uri =
          manuscriptData.submission.link ||
          manuscriptData.submission.biorxivURL ||
          manuscriptData.submission.url ||
          manuscriptData.submission.uri

        doi = manuscriptData.doi

        allNewManuscripts.push({
          submission: {},
          meta: { title: '' },
          importSourceServer: null,
          ...manuscriptData,
          status: 'new',
          isImported: true,
          importSource,
          submitterId,
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
          teams: [],
          groupId,
        })
      }

      // Check if DOI or URI already exist and skip if they do
      if (doi) doisAlreadyImporting.push(doi)

      if (uri) urisAlreadyImporting.push(uri)
    })

    console.log('Total Items to save in DB => ', allNewManuscripts.length)

    saveImportedManuscripts(allNewManuscripts)

    if (lastImportDate) {
      await models.ArticleImportHistory.query()
        .patch({ date: new Date().toISOString() })
        .where({ sourceId: importSource, groupId })
    } else {
      await models.ArticleImportHistory.query().insert({
        date: new Date().toISOString(),
        sourceId: importSource,
        groupId,
      })
    }
  }
}

module.exports = { runImports, importWorkersByGroup }
