const Form = require('./form')

const resolvers = {
  Mutation: {
    deleteForm: async (_, { formId }) => {
      await Form.query().deleteById(formId)
      return { query: {} }
    },
    deleteFormElement: async (_, { formId, elementId }) => {
      const form = await Form.find(formId)

      if (!form) return null
      form.structure.children = form.structure.children.filter(
        child => child.id !== elementId,
      )

      const formRes = await Form.query().patchAndFetchById(formId, {
        structure: form.structure,
      })

      return formRes
    },
    createForm: async (_, { form }) => {
      return Form.query().insertAndFetch(form)
    },
    updateForm: async (_, { form }) => {
      return Form.query().patchAndFetchById(form.id, form)
    },
    updateFormElement: async (_, { element, formId }) => {
      const form = await Form.find(formId)
      if (!form) return null

      const indexToReplace = form.structure.children.findIndex(
        field => field.id === element.id,
      )

      if (indexToReplace < 0) form.structure.children.push(element)
      else form.structure.children[indexToReplace] = element

      return Form.query().patchAndFetchById(formId, {
        structure: form.structure,
      })
    },
  },
  Query: {
    form: async (_, { formId }) => Form.find(formId),
    forms: async () => Form.all(),
    formsByCategory: async (_, { category }) =>
      Form.findByField('category', category),
    formForPurpose: async (_, { purpose }) =>
      Form.findOneByField('purpose', purpose),
  },
}

module.exports = resolvers
