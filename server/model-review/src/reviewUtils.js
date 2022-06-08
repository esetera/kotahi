/** Checks through all fields containing files, and any files expressed in object form are replaced with simple IDs.
 * This also converts any jsonData in string form to a parsed object.
 * This modifies the supplied reviewDelta IN PLACE. */
/* eslint-disable no-restricted-syntax, no-param-reassign */
const convertFilesToIdsOnly = (reviewDelta, form) => {
  if (!reviewDelta.jsonData) return
  if (typeof reviewDelta.jsonData === 'string')
    reviewDelta.jsonData = JSON.parse(reviewDelta.jsonData)

  const fileFieldNames = form.structure.children
    .filter(field =>
      ['SupplementaryFiles', 'VisualAbstract'].includes(field.component),
    )
    .map(field => field.name)

  for (const [key, value] of Object.entries(reviewDelta.jsonData)) {
    if (fileFieldNames.includes(key)) {
      reviewDelta.jsonData[key] = value.map(file => file.id || file)
    }
  }
}
/* eslint-enable no-restricted-syntax, no-param-reassign */

/** For all fields containing files, convert files expressed as simple IDs into full object form
 * with time-limited URL.
 * This also converts any jsonData in string form to a parsed object.
 * This modifies the supplied review IN PLACE. */
/* eslint-disable no-restricted-syntax, no-await-in-loop, no-param-reassign */
const convertFilesToFullObjects = async (
  review,
  form,
  /** Function to return full file objects from DB, for an array of file IDs */
  getFilesByIds,
  getFilesWithUrl,
) => {
  const fileFieldNames = form.structure.children
    .filter(field =>
      ['SupplementaryFiles', 'VisualAbstract'].includes(field.component),
    )
    .map(field => field.name)

  if (typeof review.jsonData === 'string')
    review.jsonData = JSON.parse(review.jsonData)

  for (const [key, value] of Object.entries(review.jsonData)) {
    if (fileFieldNames.includes(key)) {
      const fileIds = value.map(file => file.id || file) // Paranoia, in case some files are already in full object form
      const files = await getFilesByIds(fileIds)
      review.jsonData[key] = await getFilesWithUrl(files)
    }
  }
}
/* eslint-enable no-restricted-syntax, no-await-in-loop, no-param-reassign */

module.exports = { convertFilesToIdsOnly, convertFilesToFullObjects }
