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

const serverUrl = 'http://localhost:4567'

// 	curl --location --request POST 'http://localhost:4567' \
// --form 'references="Derrida, J. (1967). L’écriture et la différence (1 éd.). Paris: Éditions du Seuil.
// Vassy, J.L.; Christensen, K.D.; Schonman, E.F.; Blout, C.L.; Robinson, J.O.; Krier, J.B.; Diamond, P.M.; Lebo, M.; Machini, K.; Azzariti, D.R.; et al. The Impact of Whole-Genome Sequencing on the Primary Care and Outcomes of Healthy Adult Patients. Ann. Intern. Med. 2017, 167, 159–169, https://doi.org/10.7326/M17-018."'

const parseCitations = async references => {
  // 1 pass references to anystyle
  const form = new FormData()
  form.append('references', references)

  return new Promise((resolve, reject) => {
    axios
      .post(serverUrl, form, {
        headers: form.getHeaders(),
      })
      .then(async res => {
        // 2 pass citations to HTML wrapper
        // res.data is Anystyle JSON
        const htmledResult = await anyStyleToHtml(references, res.data)
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
      console.log('returned THML: ', outReferences)
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
