const axios = require('axios')
// const config = require('config')
const { logger } = require('@coko/server')

// TODO: Presumably we should be picking up account name from config?
// Question: why are we using two separate emails for this?

const dummyEmail = 'test@gmail.com'
const crossRefEmail = 'peroli.sivaprakasam@amnet-systems.com'

axios.interceptors.request.use(req => {
  logger.debug('Starting Request:', JSON.stringify(req, null, 2))
  return req
})

axios.interceptors.response.use(resp => {
  logger.debug('Response:', JSON.stringify(resp.data, null, 2))
  return resp
})

const pluckAuthors = authors => {
  if (!authors) return authors
  return authors.map(({ given, family, sequence }) => {
    return { given, family, sequence }
  })
}

const pluckTitle = title => title && title[0]
const pluckJournalTitle = journalTitle => journalTitle && journalTitle[0]

const createReference = data => {
  const {
    DOI: doi,
    author,
    page,
    title,
    issue,
    volume,
    'container-title': journalTitle,
  } = data

  return {
    doi,
    author: pluckAuthors(author),
    page,
    issue,
    volume,
    title: pluckTitle(title),
    journalTitle: pluckJournalTitle(journalTitle),
  }
}
// const refValConfig = config.get('referenceValidator')

const getMatchingReferencesFromCrossRef = async (reference, count = 3) => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get('https://api.crossref.org/works', {
      params: {
        'query.bibliographic': reference,
        rows: count,
        select: 'DOI,author,issue,page,title,volume,container-title',
        mailto: dummyEmail,
      },
      headers: {
        'User-Agent': `Kotahi (Axios 0.21; mailto:${dummyEmail})`,
      },
    })
    .then(response => {
      return response.data.message.items.reduce(
        (accumulator, current, index) => {
          accumulator.push(createReference(current))
          return accumulator
        },
        [],
      )
    })
}

const getReferenceWithDoi = async doi => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get(`https://api.crossref.org/works/${doi}`, {
      params: {
        mailto: crossRefEmail,
      },
      headers: {
        'User-Agent': `Kotahi (Axios 0.21; mailto:${crossRefEmail})`,
      },
    })
    .then(response => {
      return createReference(response.data.message)
    })
}

module.exports = {
  getMatchingReferencesFromCrossRef,
  getReferenceWithDoi,
}
