const models = require('@pubsweet/models')
const { parseString } = require('xml2js')
const { makeJats } = require('../utils/jatsUtils')
const articleMetadata = require('../pdfexport/pdfTemplates/articleMetadata')
const publicationMetadata = require('../pdfexport/pdfTemplates/publicationMetadata')

const getManuscriptById = async id => {
  return models.Manuscript.query().findById(id)
}

const jatsHandler = async manuscriptId => {
  const manuscript = await getManuscriptById(manuscriptId)
  const html = manuscript.meta.source

  const { jats } = makeJats(
    html,
    articleMetadata(manuscript),
    publicationMetadata,
  )

  let parseError = null

  // check if this is valid XML – this is NOT checking whether this is valid JATS
  parseString(jats, err => {
    if (err) {
      console.error(err)
      // send back the error if there is an error
      parseError = JSON.stringify(err, Object.getOwnPropertyNames(err))
    }
  })

  return { jats, error: parseError }
}

const resolvers = {
  Query: {
    convertToJats: async (_, { manuscriptId }, ctx) => {
      const { jats, error } = await jatsHandler(manuscriptId, ctx)
      return { xml: jats || '', error: error || null }
    },
  },
}

const typeDefs = `
	extend type Query {
		convertToJats(manuscriptId: String!): ConvertToJatsType
	}

	type ConvertToJatsType {
		xml: String!
		error: String
	}

`

module.exports = { resolvers, typeDefs }
