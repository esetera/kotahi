// const fs = require('fs')
// const path = require('path')
const htmlparser2 = require('htmlparser2')
const cheerio = require('cheerio')

// const rawData = fs.readFileSync(
//   path.resolve(__dirname, 'data/sampleReferences.xml'),
//   'utf8',
// )

// Assuming that you have anystyle-cli running locally, sample data can be generated by running anystyle-cli locally:
//
//   anystyle -f xml parse server/anystyle/data/sampleReferences.txt server/anystyle/data
//
// which will export JSON and XML to server/anystyle/data
//
// If using a different filename, change the filenames in this file for sampleReferenceArray and rawData.
// The XML created this way is interesting but not as detailed as the JSON--look at the author names for example.

// # Anystyle XML tags and JATS-flavored HTML equivalents:
//
// <dataset> —> <section class="reflist"> [not actually being used in this implementation]
// <sequence> --> <span class="mixed-citation" id="ref=###">
// <citation-number> --> if this exists, this is used for the ID in <span class="mixed-citation" id="ref=###">
//
// AUTHORS
//
// <author> --> <span class="author-group"> --> can we do better than this?
//
// TITLES
//
// <journal> ––> <span class="journal-title">
// <title> --< <span class="article-title">
// <volume> --> <span class="volume">
// <issue> --> <span class="issue">
// <year> --> <span class="year">
// <pages> --> <span class="first-page">, possibly also <span class="last-page">
// <url> ==> <a class="doi" href="https://doi.org/###">###</a> if it includes a DOI, otherwise just an <a href=">"
//
// NOT BEING HANDLED:
//
// <surname> --> <span class="surname">
// <given-names> --> <span class="givennames">
// <suffix> --> <span class="suffix">
// <etal> --> <span class="etal" />
// <string-name> --> <span class="author-name">

/*

// The list of all the tags:

<dataset>
  <sequence>
    <citation-number>
		<author>
    <date>
    <title>
    <container-title>
    <url>https://stacks.cdc.gov/view/cdc/85451</url>
    <journal>
    <volume>
    <pages>

    <note>
		<edition>
		<location>
		<publisher> 

*/

const makeStringSafeId = str =>
  encodeURIComponent(str)
    .toLowerCase()
    .replace(/\.|%[0-9a-z]{2}/gi, '')

const anystyleXmlToHtml = (anystyleXml, startCount = 0) => {
  // this takes the XML input from Anystyle and converts it to our HTML
  // maybe we could inject content from the JSON into the HTML if this can be done.
  const dom = htmlparser2.parseDocument(anystyleXml)
  const $ = cheerio.load(dom, { xmlMode: true })
  const outText = []

  const sequences = $('sequence')

  for (let i = 0; i < sequences.length; i += 1) {
    const thisCitation = sequences[i]
    let citationNumber = i + startCount
    let isGarbage = false

    // Sometimes Anystyle sends back garbage citations that are just citation numbers or author tags; these come before or after a regular citation. Get rid of them.
    // Test is to see if there is more than one sequence returned – if so, we're in a situation where there might be garbage data; and then
    // check if there is only one child in the returned text. If so, it's (probably) garbage.
    //
    // This does not work perfectly! If you select, for example, one citation and then a paragraph after it which is not a citation,
    // the second paragraph won't come back. The user can control/command-Z to undo this. If we could test against the original text, we could
    // maybe prevent this? But it would be better if we didn't get garbage back from Anystyle.

    if (sequences.length > 1 && $(thisCitation).children().length === 1) {
      console.error('Garbage data from Anystyle: ', $(thisCitation).text())
      isGarbage = true
    }

    if (!isGarbage) {
      // First, we get a normalized version of just the text in the citation (which can be wrapped with tags as needed)

      let theText = $(thisCitation).text().trim().replace(/\s\s+/g, ' ')
      // check if there's a citation-number tag, if so, use that as the reference ID

      if ($(thisCitation).find('citation-number').length) {
        citationNumber = makeStringSafeId(
          $(thisCitation).find('citation-number').text(),
          10,
        )

        console.error(`\n\n\nInternal citation number found: `, citationNumber)
        // TODO: wrap <citation-number> in a span with class="citation-number" and remove it from theText
        const theCitationNumber = $(thisCitation).find('citation-number').text()
        theText = theText.replace(
          theCitationNumber,
          `<span class="citation-label">${theCitationNumber}</span>`,
        )
      } else {
        console.error(
          '\n\n\nNo internal citation number, reference ID: ',
          citationNumber,
        )
      }

      console.error('Raw text: ', theText)
      console.error('XML from Anystyle: ', $(thisCitation).html())

      // check for author name

      if ($(thisCitation).find('author').length) {
        const authorName = $(thisCitation).find('author').text()
        console.error('Author name found: ', authorName)
        // TODO: can we split this?
        theText = theText.replace(
          authorName,
          `<span class="author-group">${authorName}</span>`,
        )
      }

      // check for journals

      if ($(thisCitation).find('journal').length) {
        const journalName = $(thisCitation).find('journal').text()
        console.error('Journal found: ', journalName)
        theText = theText.replace(
          journalName,
          `<span class="journal-title">${journalName}</span>`,
        )
      }

      // check for article titles

      if ($(thisCitation).find('title').length) {
        const articleName = $(thisCitation).find('title').text()
        console.error('Article title found: ', articleName)
        theText = theText.replace(
          articleName,
          `<span class="article-title">${articleName}</span>`,
        )
      }

      // check for date

      if ($(thisCitation).find('date').length) {
        const thisDate = $(thisCitation).find('date').text()
        console.error('Date found: ', thisDate)
        theText = theText.replace(
          thisDate,
          `<span class="year">${thisDate}</span>`,
        )
      }

      // check for volume

      if ($(thisCitation).find('volume').length) {
        const thisVolume = $(thisCitation).find('volume').text()
        console.error('Volume found: ', thisVolume)
        theText = theText.replace(
          thisVolume,
          `<span class="volume">${thisVolume}</span>`,
        )
      }

      // check for issue

      if ($(thisCitation).find('issue').length) {
        const thisIssue = $(thisCitation).find('issue').text()
        console.error('Issue found: ', thisIssue)
        theText = theText.replace(
          thisIssue,
          `<span class="issue">${thisIssue}</span>`,
        )
      }

      // check for pages – split into first-page, last-name if possible

      if ($(thisCitation).find('pages').length) {
        const thisPages = $(thisCitation).find('pages').text()
        console.error('Pages found: ', thisPages)

        if (thisPages.includes('-') || thisPages.includes('–')) {
          console.error('--> Page range found, splitting!')
          const pageSplit = thisPages.split(/-|–/)
          theText = theText.replace(
            thisPages,
            `<span class="first-page">${pageSplit[0]}</span>-<span class="last-page">${pageSplit[1]}</span>`,
          )
        } else {
          theText = theText.replace(
            thisPages,
            `<span class="first-page">${thisPages}</span>`,
          )
        }
      }

      // check for URLs–-if it's a DOI, call it a DOI

      if ($(thisCitation).find('url').length) {
        const theUrl = $(thisCitation).find('url').text()
        console.error('URL found: ', theUrl)
        const isDOI = theUrl.includes('doi.org')

        if (isDOI) {
          console.error('--> DOI found, calling it a DOI')
        }

        theText = theText.replace(
          theUrl,
          `<a ${isDOI ? 'class="doi"' : ''}>${theUrl}</a>`,
        )
      }

      outText.push(
        `<span class="mixed-citation" id="ref=${citationNumber}">${theText}</span>`,
      )
    }
  }

  if (outText.length > 1) {
    console.error('Multiple citations!')
    // TODO: what if we have more than one citation? Should we put in a block-level element here?
    return outText.map(x => `<p class="paragraph">${x}</p>`).join('')
  }

  return outText[0] || ''
}

// This is designed for testing anystyle's conversion. To run:
//
// node server/anystyle/anystyleToHtml.js > server/anystyle/output/log.md

// anystyleXmlToHtml(rawData, sampleReferenceArray)

// console.error('\n\n\nOutput: ', anystyleXmlToHtml(rawData))

module.exports = anystyleXmlToHtml
