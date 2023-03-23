/* eslint-disable global-require, no-console, import/no-dynamic-require, no-await-in-loop, no-continue */
const models = require('@pubsweet/models')
const { chunk } = require('lodash')
const { getSubmissionForm } = require('./model-review/src/reviewCommsUtils')

const assertArgTypes = (args, ...typeSpecs) => {
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    const typeSpec = typeSpecs[i]
    const types = Array.isArray(typeSpec) ? typeSpec : [typeSpec]

    if (!types.includes(typeof arg))
      throw new Error(
        `Illegal type of ${typeof arg} for param '${i}. Should be ${types.join(
          ' or ',
        )}.`,
      )
  }
}

const getEmptySubmission = async () => {
  const submissionForm = await getSubmissionForm()
  if (!submissionForm) throw new Error('No submission form was found!')
  const fields = submissionForm.structure.children

  const emptySubmission = fields.reduce((acc, curr) => {
    acc[curr.name] =
      curr.component === 'CheckboxGroup' || curr.component === 'LinksInput'
        ? []
        : ''
    return {
      ...acc,
    }
  }, {})

  return emptySubmission
}

const importWorkers = []

const getBroker = name => ({
  addManuscriptImporter: (importType, doImport) => {
    assertArgTypes([importType, doImport], 'string', 'function')
    importWorkers.push({ name, importType, doImport })
  },
  findManuscriptWithDoi: async doi =>
    doi ? models.Manuscript.query().findOne({ doi }) : null,
  findManuscriptWithUri: async uri =>
    uri
      ? models.Manuscript.query().findOne(builder =>
          builder
            .whereRaw("submission->>'link'", '=', uri)
            .orWhereRaw("submission->>'biorxivURL'", '=', uri)
            .orWhereRaw("submission->>'url'", '=', uri)
            .orWhereRaw("submission->>'uri'", '=', uri),
        )
      : null,
  getStubManuscriptObject: async () => ({
    status: 'new',
    isImported: false,
    submission: await getEmptySubmission(),
    meta: { title: '' },
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
  getSubmissionForm,
  logger: console,
})

const runImports = async (submitterId = null) => {
  const importType = submitterId ? 'manual' : 'automatic'
  const allNewManuscripts = []
  const urisAlreadyImporting = []
  const doisAlreadyImporting = []

  for (let i = 0; i < importWorkers.length; i += 1) {
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
        .findOne({ sourceId: importSource })

      lastImportDate = lastImportRecord ? lastImportRecord.date : null
    } catch (error) {
      console.error(
        `Failed to query sourceId and lastImportDate for plugin. Skipping.`,
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
      console.error(`Import plugin ${worker.name} failed. Skipping.`)
      console.error(error)
      continue
    }

    if (!Array.isArray(newManuscripts))
      throw new Error(
        `Expected ${worker.name} import function to return an array of manuscripts, but received ${newManuscripts}`,
      )
    console.info(`Found ${newManuscripts.length} new manuscripts.`)

    newManuscripts.forEach(m => {
      // TODO check manuscript structure
      const uri =
        m.submission.link ||
        m.submission.biorxivURL ||
        m.submission.url ||
        m.submission.uri

      const { doi } = m

      // TODO replace an earlier manuscript if it shares uri or DOI

      allNewManuscripts.push({
        submission: {},
        meta: { title: '' },
        ...m,
        status: 'new',
        isImported: true,
        importSource,
        importSourceServer: 'pubmed',
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
        reviews: [],
        teams: [],
      })

      if (doi) doisAlreadyImporting.push(doi)
      if (uri) urisAlreadyImporting.push(uri)
    })

    if (lastImportDate) {
      await models.ArticleImportHistory.query()
        .patch({ date: new Date().toISOString() })
        .where({ sourceId: importSource })
    } else {
      await models.ArticleImportHistory.query().insert({
        date: new Date().toISOString(),
        sourceId: importSource,
      })
    }
  }

  try {
    const chunks = chunk(allNewManuscripts, 10)
    await Promise.all(
      chunks.map(async ch => {
        await models.Manuscript.query().upsertGraphAndFetch(ch, {
          relate: true,
        })
      }),
    )
  } catch (e) {
    console.error(e)
  }

  console.info(
    `Imported ${allNewManuscripts.length} manuscripts using plugins, with ${submitterId} as submitterId.`,
  )
}

const registerPlugins = () => {
  let plugins

  try {
    plugins = require('../config/plugins/plugins_manifest.json')
  } catch (error) {
    console.info('No plugins manifest found; skipping plugins.')
    return
  }

  plugins.forEach(plugin => {
    if (plugin.folderName.includes('/')) {
      console.error(
        `Illegal plugin folder name '${plugin.folderName}' encountered! ` +
          `Plugins must reside directly beneath the config/plugins/ folder; the folder name cannot contain a slash. ` +
          `Skipping plugin ${plugin.name}.`,
      )
      return
    }

    let startPlugin = null

    try {
      startPlugin = require(`../config/plugins/${plugin.folderName}`)
    } catch (error) {
      console.error(error)
      console.error(
        `Failed to locate plugin ${plugin.name} in folder '${plugin.folderName}'. Skipping.`,
      )
      return
    }

    try {
      console.info(`Starting plugin ${plugin.name}...`)
      startPlugin(getBroker(plugin.name))
    } catch (error) {
      console.error(`Plugin failed:`)
      console.error(error)
    }
  })
}

module.exports = { registerPlugins, runImports }
