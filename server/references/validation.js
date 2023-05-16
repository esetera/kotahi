const axios = require('axios')

const getReference = async reference => {
  /* eslint-disable no-console */
  console.log('getReference reference: ', reference)
  let res

  try {
    const url = 'http://api.crossref.org/works'
    await axios
      .get(url, {
        params: {
          'query.bibliographic': reference,
          rows: 3,
          select: 'title,DOI,author',
        },
      })
      .then(response => {
        res = {
          items: response.data.message.items,
          status: response.data.status,
        }
      })
    /* eslint-disable no-console */
    console.log('Response: ', res)
    return res
  } catch (e) {
    /* eslint-disable no-console */
    console.log('Error: ', e)
    throw new Error(e)
  }
}

module.exports = {
  getReference,
}
