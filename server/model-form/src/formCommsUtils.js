const models = require('@pubsweet/models')
const { ref } = require('objection')

const getActiveForms = async groupId => {
  const forms = await models.Form.query()
    .where({ category: 'submission', purpose: 'submit', groupId })
    .orWhere({ category: 'review', purpose: 'review', groupId })
    .orWhere({ category: 'decision', purpose: 'decision', groupId })

  return {
    submissionForm: forms.find(f => f.purpose === 'submit'),
    reviewForm: forms.find(f => f.purpose === 'review'),
    decisionForm: forms.find(f => f.purpose === 'decision'),
  }
}

/** Change field name in form, and in all form-data for all manuscripts.
 * Avoid creating duplicate field names (though this is not guaranteed for
 * old manuscripts that contain different fields to the current form).
 */
const migrateFieldName = async (formId, oldFieldName, newFieldName) => {
  const form = await models.Form.query().findById(formId)
  if (!form)
    throw new Error(
      `Cannot change field name in form ${formId}: the form was not found`,
    )

  const field = form.structure.children.some(f => f.name === oldFieldName)
  if (!field)
    throw new Error(
      `Cannot change field name in form ${formId}: field '${oldFieldName}' was not found`,
    )

  if (oldFieldName === newFieldName) return // Nothing to do

  if (form.structure.children.some(f => f.name === newFieldName))
    throw new Error(
      `Cannot change field name in form ${formId}: a field named '${newFieldName}' already exists`,
    )

  const nameValidationRegex =
    form.purpose === 'submit'
      ? /^(?:submission\.[a-zA-Z]\w*|meta.title|meta.abstract|fileName|visualAbstract|manuscriptFile)$/
      : /^[a-zA-Z]\w*$/

  if (
    !nameValidationRegex.test(oldFieldName) ||
    !nameValidationRegex.test(newFieldName)
  )
    throw new Error(
      `Cannot change field name in form ${formId} from '${oldFieldName}' to '${newFieldName}': illegal name`,
    )

  const { groupId } = form

  if (form.purpose === 'submit') {
    const pgOldField = oldFieldName.replace('.', ':')
    const pgNewField = newFieldName.replace('.', ':')

    await models.Manuscript.query()
      .patch({
        [pgNewField]: ref(pgOldField),
        [pgOldField]: null,
      })
      .where({ groupId })
  } else if (form.purpose === 'review') {
    await models.Manuscript.relatedQuery('reviews')
      .for(models.Manuscript.query().where({ groupId }))
      .patch({
        [newFieldName]: ref(oldFieldName),
        [oldFieldName]: null,
      })
      .whereNot({ isDecision: true })
  } else {
    // form.purpose === 'decision'
    await models.Manuscript.relatedQuery('reviews')
      .for(models.Manuscript.query().where({ groupId }))
      .patch({
        [newFieldName]: ref(oldFieldName),
        [oldFieldName]: null,
      })
      .where({ isDecision: true })
  }
}

module.exports = { getActiveForms, migrateFieldName }
