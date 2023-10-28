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

      const result = await Form.query().patchAndFetchById(formId, {
        structure: form.structure,
      })

      return result
    },
    createForm: async (_, { form }) => {
      return Form.query().insertAndFetch(form)
    },
    updateForm: async (_, { form }) => {
      if (!form.isActive) {
        const formsInCategory = await Form.query()
          .select('id')
          .where({ category: form.category, isActive: true })

        if (formsInCategory.length === 1 && formsInCategory[0].id === form.id)
          // Don't let the last form in this category be made inactive, so just return the unaltered form
          return Form.query().findById(form.id)
      }

      const result = await Form.query().patchAndFetchById(form.id, form)

      // For non-submission forms, ensure we don't have two active forms in the same category
      if (result.isActive && result.category !== 'submission') {
        await Form.query()
          .patch({ isActive: false })
          .where({ isActive: true, category: result.category })
          .whereNot({ id: form.id })
      }

      return result
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
    /** Both active and inactive forms in this category, for the current group */
    allFormsInCategory: async (_, { category, groupId }) => {
      return Form.query().where({
        category,
        groupId,
      })
    },
    /** A single active form for this category, current group.
     *  Not for use with "submission" category, which allows multiple active forms */
    activeFormInCategory: async (_, { category, groupId }) => {
      if (category === 'submission')
        throw new Error(
          'Use activeFormsInCategory instead for "submission" category, as as there may be multiple active forms.',
        )
      const result = Form.query().findOne({ category, groupId, isActive: true })
      if (!result)
        throw new Error(
          `No active form found for category ${category}, groupId ${groupId}`,
        )
      return result
    },
    /** Returns active forms for this category, current group.
     * Currently intended for use with the "submission" category only, which can
     * have multiple active forms.
     */
    activeFormsInCategory: async (_, { category, groupId }) => {
      return Form.query().where({ category, groupId, isActive: true })
    },
  },
}

module.exports = resolvers
