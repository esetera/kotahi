const axios = require('axios')

const getReferenceStructure = async param => {
  let data = param
  console.log('Referdata', data)
  try {
    let res = []
    // const url = 'http://192.168.0.80:8006/predict'
    // const url = 'https://predictor-reference.amnet-systems.com/predict'
    const url =
      'https://predictor-reference.amnet-systems.com/predict'

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    
    let ar = await Promise.all(
      data.map(async data1 => {
        let inputData = {
          payload: [data1],
        }
        await axios.post(url, inputData).then(response => {
          res.push(response.data)
        })
      }),
    )
    console.log(res)
    return { response: JSON.stringify(res) }
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

module.exports = {
  getReferenceStructure,
}
