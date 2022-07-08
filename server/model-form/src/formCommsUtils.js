const models = require('@pubsweet/models')
const { get, escape } = require('lodash')
const { getUsersById } = require('../../model-user/src/userCommsUtils')

const {
  addUserObjectsToDiscussion,
} = require('../../model-threaded-discussion/src/threadedDiscussionUtils')

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

const hasText = val => {
  return (
    typeof val === 'string' &&
    val &&
    val !== '<p class="paragraph"></p>' &&
    val !== '<p></p>'
  )
}

const getPublishableTextFromComment = commentObject => {
  if (!commentObject.commentVersions || !commentObject.commentVersions.length)
    return null

  const comment =
    commentObject.commentVersions[commentObject.commentVersions.length - 1]

  const authorName = commentObject.commentVersions[0].author.username

  if (!hasText(comment.comment)) return null
  return `<p><b>${escape(authorName)}:</b></p>${comment.comment}` // TODO Get author name instead of ID
}

const getPublishableTextFromValue = (value, field) => {
  if (field.component === 'TextField') {
    if (!value) return null
    return `<p>${escape(value)}</p>`
  }

  if (field.component === 'AbstractEditor') {
    if (!hasText(value)) return null
    return value
  }

  if (field.component === 'CheckboxGroup') {
    if (!value) return null

    const optionLabels = value.map(
      val => (field.options.find(o => o.value === val) || { label: val }).label,
    )

    if (!optionLabels.length) return null
    return `<p>${escape(
      field.shortDescription || field.title,
    )}:</p><ul>${optionLabels
      .map(label => `<li>${escape(label)}</li>`)
      .join('')}</ul>`
  }

  if (['Select', 'RadioGroup'].includes(field.component)) {
    const { label } = field.options.find(o => o.value === value) || {
      label: value,
    }

    return `<p>${escape(field.shortDescription || field.title)}: ${escape(
      label,
    )}</p>`
  }

  if (field.component === 'LinksInput') {
    if (!value || !value.length) return null

    return `<p>${escape(
      field.shortDescription || field.title,
    )}:</p><ul>${value
      .map(
        link =>
          `<li><a href="${escape(link.url)}">${escape(link.url)}</a></li>`,
      )
      .join('')}</ul>`
  }

  if (field.component === 'AuthorsInput') {
    if (!value || !value.length) return null
    return `<p>${escape(
      field.shortDescription || field.title,
    )}:</p><ul>${value.map(author => {
      const escapedName = escape(`${author.firstName} ${author.lastName}`)

      const affiliationMarkup = author.affiliation
        ? ` (${escape(author.affiliation)})`
        : ''

      const emailMarkup = author.email
        ? ` <a href="mailto:${escape(author.email)}">${escape(
            author.email,
          )}</a>`
        : ''

      return `<li>${escapedName}${affiliationMarkup}${emailMarkup}</li>`
    })}</ul>`
  }

  return value
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
      const { publishingTag } = field
      const value = get(data, field.name)

      if (field.component === 'ThreadedDiscussion') {
        const discussion = threadedDiscussions.find(td => td.id === value)
        if (!discussion) return []

        return discussion.threads.map(t =>
          t.comments.map(c => {
            const text = getPublishableTextFromComment(c)

            const shouldPublish =
              text && fieldsToPublish.includes(`${field.name}:${c.id}`)

            return { field, text, shouldPublish, publishingTag, index }
          }),
        )
      }

      const text = getPublishableTextFromValue(value, field)
      const shouldPublish = text && fieldsToPublish.includes(field.name)
      return { field, text, shouldPublish, publishingTag, index }
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

  const threadedDiscussions = await Promise.all(
    (
      await models.ThreadedDiscussion.query().where({
        manuscriptId: manuscript.parentId || manuscript.id,
      })
    ).map(discussion => addUserObjectsToDiscussion(discussion, getUsersById)),
  )

  // TODO The rest could be extracted into formUtils.js and made testable

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
