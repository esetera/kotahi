const axios = require('axios')

const getReference = async reference => {
    console.log('test', reference)
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
                    status: response.data.status
                }
            })
        return res
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

module.exports = {
    getReference,
}
