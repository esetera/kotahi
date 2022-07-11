const fs = require('fs')
const path = require('path')
const axios = require('axios')
const FormData = require('form-data')
const anyStyleToHtml = require('./anystyleToHtml')

const serverUrl = 'http://localhost:4567'

// Model for this (from https://hub.docker.com/r/boosen/anystyle):
// 	curl --location --request POST 'http://localhost:4567' \
// --form 'references="Derrida, J. (1967). L’écriture et la différence (1 éd.). Paris: Éditions du Seuil.
// Vassy, J.L.; Christensen, K.D.; Schonman, E.F.; Blout, C.L.; Robinson, J.O.; Krier, J.B.; Diamond, P.M.; Lebo, M.; Machini, K.; Azzariti, D.R.; et al. The Impact of Whole-Genome Sequencing on the Primary Care and Outcomes of Healthy Adult Patients. Ann. Intern. Med. 2017, 167, 159–169, https://doi.org/10.7326/M17-018."'

const getAnystyle = async references => {
  const form = new FormData()
  form.append('references', references)

  try {
    const { data } = axios.post(serverUrl, form, {
      headers: form.getHeaders(),
    })

    return data
  } catch (err) {
    console.error('Problem with Anystyle: ', err)
    return null
  }
}

const parseCitations = async references => {
  // 1 pass references to anystyle
  try {
    const output = await getAnystyle(references)
    // 2 pass results to anyStyleToHtml
    console.log('Output: ', output)

    if (output) {
      const htmledResult = await anyStyleToHtml(output)
      return htmledResult
    }
  } catch (err) {
    return null
  }

  return null
}

const resolvers = {
  Query: {
    buildCitations: async (_, { textReferences }, ctx) => {
      const outReferences = await parseCitations(textReferences)
      console.log('htmlReferences: ', outReferences)
      return { htmlReferences: outReferences || '' }
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

// this is loading a text file of references for testing

// const sampleReferences = fs.readFileSync(
//   path.resolve(__dirname, 'data/sampleReferences.txt'),
//   'utf8',
// )

// const output = parseCitations(sampleReferences)

// console.log('Final output: ', output)
