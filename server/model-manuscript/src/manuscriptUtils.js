const checkIsAbstractValueEmpty = require('../../utils/checkIsAbstractValueEmpty')

const stripSensitiveItems = manuscript => {
  const result = {
    ...manuscript,
    manuscriptVersions: (manuscript.manuscriptVersions || []).map(v => ({
      ...v,
    })),
  }

  if (result.reviews) {
    result.reviews.forEach((review, index) => {
      delete result.reviews[index].confidentialComment
    })
  }

  if (result.manuscriptVersions) {
    result.manuscriptVersions.forEach((v, vI) => {
      if (v.reviews) {
        v.reviews.forEach((r, rI) => {
          delete result.manuscriptVersions[vI].reviews[rI].confidentialComment
        })
      }
    })
  }

  return result
}

const fixMissingValuesInFilesInSingleMsVersion = ms => {
  const result = { ...ms }

  if (ms.files)
    result.files = ms.files.map(f => ({
      ...f,
      tags: f.tags || [],
      storedObjects: f.storedObjects || [],
    }))

  return result
}

/** Returns a new manuscript object in which null/undefined files, file tags and file storedObjects are replaced with []. */
const fixMissingValuesInFiles = ms => {
  const result = fixMissingValuesInFilesInSingleMsVersion(ms)
  if (result.manuscriptVersions)
    result.manuscriptVersions = result.manuscriptVersions.map(v =>
      fixMissingValuesInFilesInSingleMsVersion(v),
    )

  return result
}

/** Get evaluations as
 * [
 *  [submission.review1, submission.review1date],
 *  [submission.review2, submission.review2date],
 *  ...,
 *  [submission.summary, submission.summarydate]
 * ]
 * These are evaluations in the submission form, NOT normal reviews. */
const getEvaluationsAndDates = manuscript => {
  const evaluationValues = Object.entries(manuscript.submission)
    .filter(
      ([prop, value]) =>
        !Number.isNaN(Number(prop.split('review')[1])) &&
        prop.includes('review'),
    )
    .map(([propName, value]) => [
      value,
      manuscript.submission[`${propName}date`],
    ])

  evaluationValues.push([
    manuscript.submission.summary,
    manuscript.submission.summarydate,
  ])

  return evaluationValues
}

const hasEvaluations = manuscript => {
  const evaluations = getEvaluationsAndDates(manuscript)
  return evaluations.map(checkIsAbstractValueEmpty).some(isEmpty => !isEmpty)
}

module.exports = {
  stripSensitiveItems,
  fixMissingValuesInFiles,
  hasEvaluations,
}
