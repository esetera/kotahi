// const fs = require('fs')

// This should return an object with front matter from the form that should be sent to the PDF or to JATS.
// It takes the manuscript as an argument and returns a frontmatter object that can be sentt to the JATS or PDF processor.
// Because every form is different, different users will need to make their own versions of this to suit their needs.

// this should pull in (and be replaced by) a user version from config/journal/exportsettings/articleMetadata.js

// if (!fs.existsSync('../../../config/journal/export/articleMetadata.json')) {
//   // If the file doesn't exist, create one.
//   console.log("User articleMetadata.js doesn't exist, creating one.")
//   fs.writeFileSync(
//     '../../../config/journal/export/articleMetadata.json',
//     `const articleMetadata = {}

// 		module.exports = articleMetadata`,
//   )
// }
let userArticleMetadata = {}

try {
  // eslint-disable-next-line global-require, import/no-unresolved
  userArticleMetadata = require('../../../config/journal/export/articleMetadata.json')
} catch {
  // eslint-disable-next-line no-console
  console.log("userArticleMetadata doesn't exist.")
}

const makeFormattedAuthors = (authors, correspondingAuthor) => {
  // authors is an array of objects with firstName, lastName, affiliation, email
  // correspondingAuthor is an email address

  // This returns something like this:
  // <p class="formattedAuthors">Bob Aaaaa <sup>a</sup><sup>*</sup>, Bob Bbbbbbb <sup>a</sup>, Bob Ccccccccc <sup>b</sup>, Bob Dddddddd <sup>c</sup></p>
  // <ul class="formattedAffiliations"><li>a: Affiliation 1</li>,<li>b: Affiliation 2</li>,<li>c: Affiliation 3</li></ul>

  let outHtml = `<p class="formattedAuthors">`
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'

  const affiliationMemo = [...new Set(authors.map(x => x.affiliation))]
    .sort()
    .map((affiliation, index) => ({
      label: alphabet[index % 26],
      value: affiliation,
    }))

  const outAuthors = [] // an array of formatted author names

  for (let i = 0; i < authors.length; i += 1) {
    let thisAuthor

    // we are assuming that author.affiliation is a single string. We could make this an array?
    const affliationList = affiliationMemo
      .filter(x => x.value === authors[i].affiliation)
      .map(x => x.label)

    thisAuthor += `${authors[i].firstName} ${authors[i].lastName} (${authors[i].email})`

    if (affliationList.length) {
      thisAuthor += ` <sup>${affliationList.join(', ')}</sup>`
    }

    if (correspondingAuthor && correspondingAuthor === authors[i].email) {
      // check if there is a corresponding author; if there is one, add a star to the author's name
      thisAuthor += ` <sup>*</sup>`
    }

    outAuthors.push(thisAuthor)
  }

  outHtml += outAuthors.join(', ')

  outHtml += `</p>`
  outHtml += `<ul class="formattedAffiliations">${affiliationMemo.map(
    affiliation => `<li>${affiliation.label}: ${affiliation.value}</li>`,
  )}</ul>`
  // console.log('\n\n\nFormatted authors: \n\n', outHtml, '\n\n\n')
  return outHtml
}

const articleMetadata = manuscript => {
  const meta = {}

  if (manuscript && manuscript.meta && manuscript.meta.manuscriptId) {
    meta.id = manuscript.meta.manuscriptId
  }

  if (manuscript && manuscript.meta && manuscript.meta.title) {
    meta.title = manuscript.meta.title
  }

  if (manuscript && manuscript.created) {
    meta.pubDate = manuscript.created
  }

  if (manuscript && manuscript.submission) {
    meta.submission = manuscript.submission
  }

  if (
    manuscript &&
    manuscript.submission &&
    manuscript.submission.authorNames &&
    manuscript.submission.authorNames.length
  ) {
    meta.authors = []

    meta.authors = manuscript.submission.authorNames.map(author => ({
      email: author.email || '',
      firstName: author.firstName || '',
      lastName: author.lastName || '',
      affiliation: author.affiliation || '',
      id: author.id || '',
    }))

    meta.formattedAuthors = makeFormattedAuthors(
      meta.authors,
      manuscript.submission.AuthorCorrespondence, // does this need to be renamed?
    )
  }

  // replace things by what's in the user version if we need to.

  Object.entries(userArticleMetadata).forEach(([key, value]) => {
    if (value) meta[key] = value
  })

  return meta
}

module.exports = articleMetadata
