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
) => value => {
  const validator = vld || []

  if (componentType === 'AuthorsInput') {
    if (
      validator.some(v => v.value === 'required') &&
      (value || []).length <= 0
    )
      return 'Required'
    return validateAuthors(value)
  }

  if (validator.length === 0) return undefined
  const errors = []
  validator
    .map(v => v.value)
    .map(validatorFn => {
      // if there is YSWYG component and it's empty - the value is a paragraph
      const valueFormatted =
        componentType === 'AbstractEditor' && value === '<p></p>' ? '' : value

      const error =
        validatorFn === 'required'
          ? validators[validatorFn](valueFormatted)
          : validators[validatorFn](valueField[validatorFn])(valueFormatted)

      if (error) {
        errors.push(error)
      }

      return validatorFn
    })

  if (
    errors.length === 0 &&
    fieldName === 'submission.articleURL' &&
    doiValidation // TODO We could get rid of this flag and simply test whether validateDoi has a value
  )
    return validateDoi(value)

  return errors.length > 0 ? errors[0] : undefined
}
