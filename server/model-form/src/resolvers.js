const models = require('@pubsweet/models')

const resolvers = {
  Mutation: {
    deleteForm: async (_, { formId }) => models.Form.query().deleteById(formId),
    deleteFormElement: async (_, { formId, elementId }) => {
      const form = await models.Form.find(formId)

      if (!form) return null
      form.structure.children = form.structure.children.filter(
        child => child.id !== elementId,
      )

      const result = await models.Form.query().patchAndFetchById(formId, {
        structure: form.structure,
      })

      return result
    },
    createForm: async (_, { form }) => {
      return models.Form.query().insertAndFetch(form)
    },
    updateForm: async (_, { form }) => {
      if (!form.structure.purpose)
        throw new Error('Form without purpose field encountered!')
      const currentForm = await models.Form.query().findById(form.id)

      const isActiveIsChanging = form.isActive !== currentForm.isActive
      let newIsActive = form.isActive
      let newIsDefault = form.isDefault

      if (isActiveIsChanging && !form.isActive) {
        const otherActiveFormsInCategory = await models.Form.query()
          .where({
            category: currentForm.category,
            isActive: true,
            groupId: currentForm.groupId,
          })
          .whereNot({ id: currentForm.id })
          .select('id')

        if (otherActiveFormsInCategory.length < 1) {
          // eslint-disable-next-line no-console
          console.log(
            `Preventing inactivation of the last active ${currentForm.category} form.`,
          )
          newIsActive = true
        } else if (form.category === 'submission') {
          const formIsUsedByManuscripts = (
            await models.Manuscript.query()
              .whereRaw(
                "submission->>'$$formPurpose' = ?",
                form.structure.purpose,
              )
              .where({ groupId: currentForm.groupId })
              .limit(1)
              .select('id')
          ).length

          if (formIsUsedByManuscripts) {
            // eslint-disable-next-line no-console
            console.log(
              `Preventing inactivation of form with purpose "${form.structure.purpose}", which is in use`,
            )
            newIsActive = true
          }
        }

        if (!newIsActive && currentForm.isDefault) {
          const idOfNewDefault = otherActiveFormsInCategory[0]?.id
          if (!idOfNewDefault)
            throw new Error(
              `Last active form in category "${currentForm.category}" has been inactivated. This isn't supposed to happen!`,
            )
          newIsDefault = false
          await models.Form.query()
            .findById(idOfNewDefault)
            .patch({ isDefault: true })
        }
      }

      const result = await models.Form.query().patchAndFetchById(form.id, {
        ...form,
        isActive: newIsActive,
        isDefault: newIsDefault,
      })

      // Ensure we don't have two active forms for the same category/purpose combination
      if (isActiveIsChanging && form.isActive) {
        await models.Form.query()
          .patch({ isActive: false })
          .where({
            isActive: true,
            category: result.category,
            groupId: result.groupId,
          })
          .whereRaw("structure->>'purpose' = ?", result.structure.purpose)
          .whereNot({ id: result.id })
      }

      if (result.isDefault && !currentForm.isDefault) {
        await models.Form.query()
          .patch({ isDefault: false })
          .where({
            isDefault: true,
            category: result.category,
            groupId: result.groupId,
          })
          .whereNot({ id: result.id })
      }

      return result
    },
    updateFormElement: async (_, { element, formId }) => {
      const form = await models.Form.find(formId)
      if (!form) return null

      const indexToReplace = form.structure.children.findIndex(
        field => field.id === element.id,
      )

      if (indexToReplace < 0) form.structure.children.push(element)
      else form.structure.children[indexToReplace] = element

      return models.Form.query().patchAndFetchById(formId, {
        structure: form.structure,
      })
    },
  },
  Query: {
    form: async (_, { formId }) => models.Form.find(formId),
    /** Both active and inactive forms in this category, for the current group */
    allFormsInCategory: async (_, { category, groupId }) => {
      return models.Form.query().where({
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

      const result = models.Form.query().findOne({
        category,
        groupId,
        isActive: true,
      })

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
      return models.Form.query()
        .where({ category, groupId, isActive: true })
        .orderByRaw("structure->>'name'")
    },
  },
}

module.exports = resolvers
