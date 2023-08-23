const models = require('@pubsweet/models')
const { getSubmissionForm } = require('../model-review/src/reviewCommsUtils')
const { importWorkersByGroup } = require('./imports')

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

const getExistingManuscripts = async groupId => {
  // eslint-disable-next-line no-return-await
  return await models.Manuscript.query().where('group_id', groupId)
}

const getBroker = (groupId, workerName) => {
  let importWorkers = importWorkersByGroup[groupId]

  if (!importWorkers) {
    importWorkers = []
    importWorkersByGroup[groupId] = importWorkers
  }

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
    // eslint-disable-next-line no-return-await
    getExistingManuscripts: async () => await getExistingManuscripts(groupId),
    groupId,
    logger: console,
  }
}

module.exports = { getBroker }
