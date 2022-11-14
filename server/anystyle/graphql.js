// const fs = require('fs')
// const path = require('path')
const axios = require('axios')
const FormData = require('form-data')
const anyStyleToHtml = require('./anystyleToHtml')

// this is loading a text file of references for testing
// TODO: remove this after testing!

// const sampleReferences = fs.readFileSync(
//   path.resolve(__dirname, 'data/sampleReferences.txt'),
//   'utf8',
// )

const convertHtmlToText = text => {
  let returnText = text

  // -- remove BR tags and replace them with line break
  returnText = returnText.replace(/<br>/gi, '\n')
  returnText = returnText.replace(/<br\s\/>/gi, '\n')
  returnText = returnText.replace(/<br\/>/gi, '\n')

  // -- remove P and A tags but preserve what's inside of them
  returnText = returnText.replace(/<p.*>/gi, '\n')
  returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, ' $2 ($1)')

  // -- remove all inside SCRIPT and STYLE tags
  returnText = returnText.replace(
    /<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi,
    '',
  )
  returnText = returnText.replace(
    /<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi,
    '',
  )
  // -- remove all else
  returnText = returnText.replace(/<(?:.|\s)*?>/g, '')

  // -- get rid of more than 2 multiple line breaks:
  returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, '\n\n')

  // -- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g, '')

  // -- get rid of html-encoded characters:
  returnText = returnText.replace(/&nbsp;/gi, ' ')
  returnText = returnText.replace(/&amp;/gi, '&')
  returnText = returnText.replace(/&quot;/gi, '"')
  returnText = returnText.replace(/&lt;/gi, '<')
  returnText = returnText.replace(/&gt;/gi, '>')

  // -- return
  return returnText
}

const serverUrl = 'http://localhost:4567'

// 	curl --location --request POST 'http://localhost:4567' \
// --form 'references="Derrida, J. (1967). L’écriture et la différence (1 éd.). Paris: Éditions du Seuil.
// Vassy, J.L.; Christensen, K.D.; Schonman, E.F.; Blout, C.L.; Robinson, J.O.; Krier, J.B.; Diamond, P.M.; Lebo, M.; Machini, K.; Azzariti, D.R.; et al. The Impact of Whole-Genome Sequencing on the Primary Care and Outcomes of Healthy Adult Patients. Ann. Intern. Med. 2017, 167, 159–169, https://doi.org/10.7326/M17-018."'

const parseCitations = async references => {
  // 1 pass references to anystyle
  const form = new FormData()
  // clean any HTML out of what's coming in to Anystyle so it isn't confused
  form.append('references', convertHtmlToText(references))

  return new Promise((resolve, reject) => {
    axios
      .post(serverUrl, form, {
        headers: form.getHeaders(),
      })
      .then(async res => {
        // 2 pass citations to HTML wrapper
        // res.data is Anystyle JSON
        // TODO: take an initial index for the reference IDs so we don't make duplicate IDs
        const htmledResult = anyStyleToHtml(res.data, 0)
        resolve(htmledResult)
      })
      .catch(async err => {
        console.error('Problem with Anystyle: ', err)
        reject(err)
      })
  })
}

const resolvers = {
  Query: {
    buildCitations: async (_, { textReferences }, ctx) => {
      const outReferences = await parseCitations(textReferences)
      // console.log('returned THML: ', outReferences)
      return { html: outReferences || '' }
    },
  },
}

const typeDefs = `
	extend type Query {
		buildCitations(textReferences: String!): BuildCitationsType
	}

	type BuildCitationsType {
		htmlReferences: String!
	}
`

module.exports = { resolvers, typeDefs }

// TODO: REMOVE AFTER TESTING:

// const output = parseCitations(sampleReferences)

// console.log('Final output: ', output)
