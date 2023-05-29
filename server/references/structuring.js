const axios = require('axios')

// If you POST to https://predictor-reference.amnet-systems.com/predict with no auth, raw content,
// content {"payload": ["8. Rochette AD, Spitznagel MB, Strain G, Devlin M, Crosby RD, Mitchell JE, et al. (2016): Mild cognitive impairment is prevalent in persons with severe obesity. Obesity 24: 1427–1429."]}, the reference string will be tokenized.
// Note that SSL certificate verification needs to be turned off for this to work.

const getReferenceStructure = async arrayOfStrings => {
  console.log('in get reference structure!')
  // input is an array of strings, each a single reference
  const data = arrayOfStrings

  try {
    const res = []

    // const url = 'http://192.168.0.80:8006/predict'
    // const url = 'https://predictor-reference.amnet-systems.com/predict'
    const url = 'https://predictor-reference.amnet-systems.com/predict'

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    await Promise.all(
      data.map(async data1 => {
        const inputData = {
          payload: [data1],
        }

        console.log('Sending data: ', data1)
        await axios.post(url, inputData).then(response => {
          res.push(response.data)
        })
      }),
    )

    // console.log('Reference structuring response: ', res)
    // This sends back a stringified array of prediction objects.
    return { response: JSON.stringify(res) }
  } catch (e) {
    console.error('Error: ', e)
    throw new Error(e)
  }
}

module.exports = {
  getReferenceStructure,
}
