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

const getEmptySubmission = async groupId => {
  const submissionForm = await getSubmissionForm(groupId)
  if (!submissionForm) throw new Error('No submission form was found!')
  const fields = submissionForm.structure.children

  const emptySubmission = fields.reduce((acc, curr) => {
    acc[curr.name] = ['CheckboxGroup', 'LinksInput', 'AuthorsInput'].includes(
      curr.component,
    )
      ? []
      : ''
    return {
      ...acc,
    }
  }, {})

  return emptySubmission
}

const importWorkersByGroup = {}

const getBroker = (groupId, workerName) => {
  const importWorkers = importWorkersByGroup[groupId]

  return {
    addManuscriptImporter: (importType, doImport) => {
      assertArgTypes([importType, doImport], 'string', 'function')
      importWorkers.push({ name: workerName, importType, doImport })
    },
    findManuscriptWithDoi: async doi =>
      doi ? models.Manuscript.query().findOne({ doi, groupId }) : null,
    findManuscriptWithUri: async uri =>
      uri
        ? models.Manuscript.query()
            .where({ groupId })
            .findOne(builder =>
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
      submission: await getEmptySubmission(groupId),
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
    getSubmissionForm: () => getSubmissionForm(groupId),
    logger: console, // TODO modify console to include group and plugin name identifier
  }
}

const runImports = async (groupId, submitterId = null) => {
  const importType = submitterId ? 'manual' : 'automatic'
  const allNewManuscripts = []
  const urisAlreadyImporting = []
  const doisAlreadyImporting = []

  const importWorkers = importWorkersByGroup[groupId]

  for (let i = 0; i < importWorkers.length; i += 1) {
    const worker = importWorkers[i]
    if (![importType, 'any'].includes(worker.importType)) continue

    console.info(`Importing manuscripts using plugin ${worker.name}`)
    let importSource, lastImportDate

    try {
      let [sourceRecord] = await models.ArticleImportSources.query().where({
        server: worker.name,
        groupId,
      })
      if (!sourceRecord)
        sourceRecord = await models.ArticleImportSources.query().insertAndFetch(
          {
            server: worker.name,
            groupId,
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
        groupId,
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
        reviews: [], // TODO This forces reviews to be empty. This should change if we want to import manuscripts with reviews already attached
        teams: [],
        groupId,
      })

      if (doi) doisAlreadyImporting.push(doi)
      if (uri) urisAlreadyImporting.push(uri)
    })

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
    `Imported ${allNewManuscripts.length} manuscripts into group ${groupId} using plugins, with ${submitterId} as submitterId.`,
  )
}

const registerPlugins = async () => {
  let pluginGroups

  try {
    // eslint-disable-next-line import/no-unresolved
    pluginGroups = require('../config/plugins/plugins_manifest.json')
  } catch (error) {
    console.info('No plugins manifest found; skipping plugins.')
    return
  }

  if (
    !Array.isArray(pluginGroups) ||
    pluginGroups.some(
      g =>
        !g.groupName ||
        typeof g.groupName !== 'string' ||
        !Array.isArray(g.plugins) ||
        g.plugins.some(
          p =>
            !p.name ||
            typeof p.name !== 'string' ||
            !p.folderName ||
            typeof p.folderName !== 'string',
        ),
    )
  ) {
    console.error(
      'The config/plugins/plugins_manifest.json file is malformed. No plugins have been registered. See example_plugins_manifest.json for correct structure.',
    )
    return
  }

  await Promise.all(
    pluginGroups.map(async pluginGroup => {
      const { groupName } = pluginGroup
      const group = await models.Group.query().findOne({ name: groupName })

      if (!group) {
        console.error(
          `Could not register plugins for group '${groupName}': no such group found.`,
        )
        return
      }

      const { plugins } = pluginGroup

      plugins.forEach(plugin => {
        if (plugin.folderName.includes('/')) {
          console.error(
            `Illegal plugin folder name '${plugin.folderName}' encountered! ` +
              `Plugins must reside directly beneath the config/plugins/ folder; the folder name cannot contain a slash. ` +
              `Skipping plugin ${plugin.name} for group ${groupName}.`,
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
          startPlugin(getBroker(group.id, plugin.name))
        } catch (error) {
          console.error(`Plugin failed:`)
          console.error(error)
        }
      })
    }),
  )
}

module.exports = { registerPlugins, runImports }
