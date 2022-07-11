import * as validators from 'xpub-validators'
import { validateAuthors } from './authorsFieldDefinitions'

// eslint-disable-next-line import/prefer-default-export
export const validateFormField = (
  vld = [],
  valueField = {},
  fieldName,
  doiValidation = false,
  validateDoi,
  componentType,
  threadedDiscussion,
) => async value => {
  const validator = vld || []

  if (componentType === 'AuthorsInput') {
    if (
      validator.some(v => v.value === 'required') &&
      (value || []).length <= 0
    )
      return 'Required'
    return validateAuthors(value)
  }

  if (componentType === 'ThreadedDiscussion') {
    let isThreadedDiscussionValid = false

    if (threadedDiscussion) {
      const threadedDiscussionData =
        threadedDiscussion?.threadedDiscussion?.threads[0].comments[0]

      const commentVersionsLength =
        threadedDiscussionData?.commentVersions.length

      if (
        threadedDiscussionData?.pendingVersion &&
        threadedDiscussionData?.pendingVersion.comment !==
          '<p class="paragraph"></p>'
      ) {
        isThreadedDiscussionValid = true
      }

      if (
        commentVersionsLength &&
        threadedDiscussionData?.commentVersions[commentVersionsLength - 1]
      ) {
        isThreadedDiscussionValid = true
      }
    }

    if (isThreadedDiscussionValid) {
      return undefined
    }

    return 'Required'
  }

  const errors = validator
    .map(v => v.value)
    .map(validatorFn => {
      // if there is YSWYG component and it's empty - the value is a paragraph
      const valueFormatted =
        componentType === 'AbstractEditor' &&
        ['<p></p>', '<p class="paragraph"></p>'].includes(value)
          ? ''
          : value

      return validatorFn === 'required'
        ? validators[validatorFn](valueFormatted)
        : validators[validatorFn](valueField[validatorFn])(valueFormatted)
    })
    .filter(Boolean)

  if (errors.length) return errors[0]
  if (value && doiValidation) return validateDoi(value)
  return undefined
}
