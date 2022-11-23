const { sanitize } = require('isomorphic-dompurify')
const Handlebars = require('handlebars')
const { transform, isObject, isArray } = require('lodash')

let docmapsScheme

try {
  // eslint-disable-next-line global-require, import/no-unresolved
  docmapsScheme = require('../../../config/journal/docmaps_scheme.json')
} catch (err) {
  docmapsScheme = null
}

const expandTemplate = availableFields => objVal => {
  return Handlebars.compile(objVal)(availableFields)
}

const getSanitizedString = val => sanitize((val || '').toString())

const mapAvailableFields = manuscript => {
  const result = { meta: {}, submission: {} }
  Object.entries(manuscript.submission).forEach(([key, val]) => {
    result[`submission.${key}`] = getSanitizedString(val)
  })
  Object.entries(manuscript.meta).forEach(([key, val]) => {
    result[`meta.${key}`] = getSanitizedString(val)
  })
  return result
}

const expandTemplatesOnSingleItemRecursive = (
  item,
  expandTemplateFunc,
  maxDepth,
) => {
  if (maxDepth < 0)
    throw new Error('Recursion error: possible cycle in docmapsScheme')
  if (isObject(item))
    return expandTemplatesAndRemoveDirectivesRecursive(
      item,
      expandTemplateFunc,
      maxDepth - 1,
    )
  if (isArray(item))
    return item.map(subItem =>
      expandTemplatesOnSingleItemRecursive(
        subItem,
        expandTemplateFunc,
        maxDepth - 1,
      ),
    )
  if (typeof item === 'string') return expandTemplateFunc(item)
  return item
}

/* eslint-disable no-param-reassign */
const expandTemplatesAndRemoveDirectivesRecursive = (
  scheme,
  expandTemplateFunc,
  maxDepth = 50,
) =>
  transform(scheme, (result, val, key) => {
    if (typeof key === 'string' && key.startsWith('__')) return // properties prefixed with __ are special directives not to be copied into the resulting docmap
    result[key] = expandTemplatesOnSingleItemRecursive(
      val,
      expandTemplateFunc,
      maxDepth,
    )
  })
/* eslint-enable no-param-reassign */

const tryPublishDocMaps = async manuscript => {
  if (!docmapsScheme) return false

  const fields = mapAvailableFields(manuscript)

  const docMap = expandTemplatesAndRemoveDirectivesRecursive(
    docmapsScheme,
    expandTemplate(fields),
  )

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(docMap, undefined, 2))
  return true
}

module.exports = { tryPublishDocMaps }
