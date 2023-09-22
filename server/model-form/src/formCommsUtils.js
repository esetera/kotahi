const models = require('@pubsweet/models')

const getActiveForms = async groupId => {
  const submissionForm = await models.Form.getCached(
    groupId,
    'submission',
    'submit',
  )

  const reviewForm = await models.Form.getCached(groupId, 'review', 'review')

  const decisionForm = await models.Form.getCached(
    groupId,
    'decision',
    'decision',
  )

  return { submissionForm, reviewForm, decisionForm }
}

/** For form for given purpose and category, return a list of all fields that are not confidential, each structured as
 * { name, title, component }
 */
const getPublicFields = async (purpose, category, groupId) => {
  const form = await models.Form.getCached(groupId, category, purpose)
  if (!form) return []

  return form.structure.children
    .filter(field => !field.hideFromAuthors)
    .map(field => ({
      name: field.name,
      title: field.shortDescription || field.title,
      component: field.component,
    }))
}

const getForm = async ({ groupId, category, purpose }) => {
  const form = await models.Form.getCached(groupId, category, purpose)
  if (!form)
    throw new Error(
      `No form found in group ${groupId} for category "${category}", purpose "${purpose}"`,
    )
  return form
}

const getReviewForm = async groupId =>
  getForm({ category: 'review', purpose: 'review', groupId })

const getDecisionForm = async groupId =>
  getForm({ category: 'decision', purpose: 'decision', groupId })

const getSubmissionForm = async groupId =>
  getForm({ category: 'submission', purpose: 'submit', groupId })

module.exports = {
  getReviewForm,
  getDecisionForm,
  getSubmissionForm,
  getPublicFields,
  getActiveForms,
}
