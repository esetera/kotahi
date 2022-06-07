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

const fixMissingValuesInFilesInSingleMsVersion = ms => ({
  ...ms,
  files: (ms.files || []).map(f => ({
    ...f,
    tags: f.tags || [],
    storedObjects: f.storedObjects || [],
  })),
})

/** Returns a new manuscript object in which null/undefined files, file tags and file storedObjects are replaced with []. */
const fixMissingValuesInFiles = ms => {
  const result = fixMissingValuesInFilesInSingleMsVersion(ms)
  if (result.manuscriptVersions)
    result.manuscriptVersions = result.manuscriptVersions.map(v =>
      fixMissingValuesInFilesInSingleMsVersion(v),
    )

  return result
}

module.exports = {
  stripSensitiveItems,
  fixMissingValuesInFiles,
}
