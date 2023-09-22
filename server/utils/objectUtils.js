const { cloneDeep, mergeWith, isArray } = require('lodash')

const replaceArrays = (destination, source) => {
  if (isArray(destination)) return source
  return undefined
}

/** Returns a deep-merge of baseObj and objToMerge.
 * If a field with the same path exists in both baseObj and objToMerge, the resulting value will come from objToMerge.
 * Two arrays at the same path are not merged, but replaced with the array from objToMerge. */
const deepMergeObjectsReplacingArrays = (baseObj, objToMerge) => {
  const result = cloneDeep(baseObj)
  mergeWith(result, objToMerge, replaceArrays)
  return result
}

/** Parses if value is a string, otherwise returns value unaltered. */
const ensureJsonIsParsed = value =>
  typeof value === 'string' ? JSON.parse(value) : value

/** Make the object immutable, recursively */
const deepFreeze = (obj, maxDepth = 50) => {
  if (!obj || typeof obj !== 'object') return obj
  if (maxDepth < 0)
    throw new Error(
      'Possible cycle detected when attempting to deepFreeze object. Exceeded maxDepth!',
    )

  const propNames = Object.getOwnPropertyNames(obj)

  // Freeze properties before freezing self
  propNames.forEach(name => {
    const prop = obj[name]
    if (typeof prop === 'object' && prop !== null && !Object.isFrozen(prop))
      deepFreeze(prop, maxDepth - 1)
  })

  // Freeze self (no-op if already frozen)
  return Object.freeze(obj)
}

module.exports = {
  deepMergeObjectsReplacingArrays,
  ensureJsonIsParsed,
  deepFreeze,
}
