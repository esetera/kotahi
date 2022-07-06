const sampleReferenceArray = require('./data/sampleReferences.json')

// Sample data can be generated by running anystyle-cli locally:
//
//   anystyle parse references.txt outputFolder
//
// which will export JSON to outputFolder

// JATS tags and JATS-flavored HTML equivalents:

// <ref-list> —> <section class="reflist">
// <ref id="ref-###"><mixed-citation> --> <p class="mixedcitation" id="ref=###">
// <person-group person-group-type="author"> --> <span class="authorgroup">
// <name> --> <span class="authorname">
// <surname> --> <span class="surname">
// <given-names> --> <span class="givennames">

const makeStringSafeId = str =>
  encodeURIComponent(str)
    .toLowerCase()
    .replace(/\.|%[0-9a-z]{2}/gi, '')

const anyStyleToHtml = referenceArray => {
  let outText = '<ref-list>'

  for (let i = 0; i < referenceArray.length; i += 1) {
    const thisRef = referenceArray[i]
    console.log(`\nCitation ${i}:\n\n`, thisRef, '\n\n\n')

    let thisOut = ''

    // 1. deal with citation numbers
    // Query: why does citation-number come in as an array?
    // If we don't have a citation number, we're just sending this back as the index. This is not necessarily unique.
    console.log(
      `Citation number found: ${JSON.stringify(thisRef['citation-number'])}`,
    )

    const citationNumber =
      thisRef['citation-number'] && thisRef['citation-number'].length
        ? makeStringSafeId(thisRef['citation-number'][0])
        : i + 1

    delete thisRef['citation-number']
    thisOut += `<ref id="ref-${citationNumber}">`

    if (thisRef.author) {
      console.log(`Author data: ${JSON.stringify(thisRef.author)}`)
      /* 
<name><surname>Delis</surname><given-names>DC</given-names></name>
<name><surname>Kaplan</surname><given-names>E.</given-names></name>
<name><surname>Kramer</surname><given-names>JH</given-names></name>
 */
      let thisAuthorGroup = `<span class="authorgroup">`

      for (let j = 0; j < thisRef.author.length; j += 1) {
        const thisAuthor = thisRef.author[j]
        thisAuthorGroup += `<span class="author">`

        if (thisAuthor.family) {
          thisAuthorGroup += `<span class="surname">${thisAuthor.family}</span>`
          delete thisAuthor.family
        }

        if (thisAuthor.given) {
          thisAuthorGroup += `<span class="givennames">${thisAuthor.given}</span>`
          delete thisAuthor.given
        }

        thisAuthorGroup += `</span>`

        if (JSON.stringify(thisAuthor).length > 2) {
          console.error(
            `\nAuthor ${j} remainder: ${JSON.stringify(thisAuthor)}`,
          )
        }
      }

      thisAuthorGroup += `</span>`
      thisOut += thisAuthorGroup
      delete thisRef.author
    }

    thisOut += `<ref id="ref-${citationNumber}"><mixed-citation>`

    console.error(
      `\nRemainder for citation ${citationNumber}:\n\n`,
      thisRef,
      '\n\n\n',
    )

    thisOut += JSON.stringify(thisRef)
    thisOut += `</mixed-citation></ref>`

    console.log(`\nOutput ${i}:\n\n`, thisOut, '\n\n\n')

    outText += thisOut
  }

  outText += '</ref-list>'
  return outText
}

const output = anyStyleToHtml(sampleReferenceArray)

module.exports = anyStyleToHtml
