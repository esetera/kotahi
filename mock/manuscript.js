const { v4: uuid } = require('uuid')

const manuscript = {
  generate: (submissionForm, prototype = {}) => {
    const prototypeMeta = prototype.meta || {}
    const prototypeSubmission = prototype.submission || {}

    const now = new Date()
    const nowIso = now.toISOString()
    const title = `New submission ${now.toLocaleString()}`
    const id = uuid()
    const blankSubmission = {}

    submissionForm.structure.children
      .filter(field => field.name.startsWith('submission.'))
      .forEach(field => {
        const fieldName = field.name.split('submission.')[1]
        blankSubmission[fieldName] = [
          'RadioGroup',
          'AuthorsInput',
          'LinksInput',
        ].includes(field.component)
          ? []
          : ''
      })

    const simpleMs = {
      id,
      parentId: null,
      manuscriptVersions: [],
      shortId: 1,
      created: nowIso,
      updated: nowIso,
      files: [],
      reviews: [],
      teams: [],
      tasks: [],
      decision: null,
      status: 'new',
      meta: {
        manuscriptId: id,
        title,
        source: null,
        abstract: null,
        history: null,
        __typename: 'ManuscriptMeta',
      },
      authors: null,
      submission: blankSubmission,
      submittedDate: nowIso,
      submitterId: null,
      published: null,
      evaluationsHypothesisMap: {},
      isImported: false,
      importSource: null,
      importSourceServer: null,
      isHidden: false,
      formFieldsToPublish: [],
      doi: null,
      searchableText: '',
      __typename: 'Manuscript',
    }

    return {
      ...simpleMs,
      ...prototype,
      meta: { ...simpleMs.meta, ...prototypeMeta },
      submission: { ...simpleMs.submission, ...prototypeSubmission },
    }
  },
}

module.exports = manuscript
