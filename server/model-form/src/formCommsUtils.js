const models = require('@pubsweet/models')
const { get } = require('lodash')

/** For form for given purpose and category, return a list of all fields that are not confidential, each in the form
 * { name, title, component }
 */
const getPublicFields = async (purpose, category) => {
  const forms = await models.Form.query().where({
    category,
    purpose,
  })

  if (!forms.length) return []
  const form = forms[0]

  return form.structure.children
    .filter(field => !field.hideFromAuthors)
    .map(field => ({
      name: field.name,
      title: field.shortDescription || field.title,
      component: field.component,
    }))
}

const getPublishableTextFromComment = commentObject => {
  if (!commentObject.commentVersions || !commentObject.commentVersions.length)
    return null

  const comment =
    commentObject.commentVersions[commentObject.commentVersions.length - 1]

  return `<p><b>${comment.userId}:</b></p>${comment.comment}` // TODO Get author name instead of ID
}

const getPublishableFieldsForObject = (
  formFieldsToPublish,
  data,
  form,
  threadedDiscussions,
  index,
) => {
  if (!form) return []
  const { fieldsToPublish } = formFieldsToPublish || { fieldsToPublish: [] }

  const {
    structure: { children: fields },
  } = form

  return fields
    .filter(f => f.permitPublishing === 'true' && f.hideFromAuthors !== 'true')
    .map(field => {
      const value = get(data, field.name)

      if (field.component === 'ThreadedDiscussion') {
        const discussion = threadedDiscussions.find(td => td.id === value)
        if (!discussion) return []

        return discussion.threads.map(t =>
          t.comments.map(c => {
            const shouldPublish = fieldsToPublish.includes(
              `${field.name}:${c.id}`,
            )

            const comment = getPublishableTextFromComment(c)
            return { field, comment, shouldPublish, index } // TODO incorporate author name... and other info?
          }),
        )
      }

      const shouldPublish = fieldsToPublish.includes(field.name)
      return { field, value, shouldPublish, index }
    })
    .flat(3)
}

/** Returns an entry for all fields that could be published, whether they are selected for publishing or not.
 * Each entry contains the field specification, the data value, and whether that field should be published.
 * ThreadedDiscussions are treated specially. Instead of one entry for the ThreadedDiscussion field, there are multiple
 * entries, one for each comment.
 */
const getPublishableFields = async manuscript => {
  const forms = await models.Form.query()
    .where({ category: 'submission', purpose: 'submit' })
    .orWhere({ category: 'review', purpose: 'review' })
    .orWhere({ category: 'decision', purpose: 'decision' })

  const threadedDiscussions = await models.ThreadedDiscussion.query().where({
    manuscriptId: manuscript.parentId || manuscript.id,
  })

  const result = []

  result.push(
    ...getPublishableFieldsForObject(
      manuscript.formFieldsToPublish.find(ff => ff.objectId === manuscript.id),
      manuscript,
      forms.find(f => f.category === 'submission'),
      threadedDiscussions,
    ),
  )

  manuscript.reviews
    .filter(r => r.isDecision)
    .forEach(r =>
      result.push(
        ...getPublishableFieldsForObject(
          manuscript.formFieldsToPublish.find(ff => ff.objectId === r.id),
          r.jsonData,
          forms.find(f => f.category === 'decision'),
          threadedDiscussions,
        ),
      ),
    )

  manuscript.reviews
    .sort((a, b) => a.created - b.created)
    .filter(r => !r.isDecision)
    .forEach((r, index) =>
      result.push(
        ...getPublishableFieldsForObject(
          manuscript.formFieldsToPublish.find(ff => ff.objectId === r.id),
          r.jsonData,
          forms.find(f => f.category === 'submit'),
          threadedDiscussions,
          index,
        ),
      ),
    )

  return result
}

module.exports = { getPublicFields, getPublishableFields }
