const axios = require('axios')
// const config = require('config')

// To test:
// POST http://localhost:3004/healthCheck
// POST http://localhost:3004/api/auth with clientId/clientSecret in Basic Auth – returns access token
// POST http://localhost:3004/api/v1/sync/DOCXToHTML with access token in Bearer Auth and docx in body – returns HTML

// const { port, protocol, host } = config['flax-site']

// console.log('flax config', config['flax-site'], config['auth-orcid'])

// const serverUrl = `${protocol}://${host}${port ? `:${port}` : ''}`
const serverUrl = `https://51ad-2409-4053-d9d-59b-bd98-8b50-b319-4dd4.ngrok-free.app`

let flaxSiteAccessToken = '' // maybe this should be saved somewhere?

// const serviceHandshake = async () => {
//   const buff = Buffer.from(`${clientId}:${clientSecret}`, 'utf8')
//   const base64data = buff.toString('base64')

//   const serviceHealthCheck = await axios({
//     method: 'get',
//     url: `${serverUrl}/healthcheck`,
//   })

//   const { data: healthCheckData } = serviceHealthCheck
//   const { message } = healthCheckData

//   if (message !== 'Coolio') {
//     throw new Error(`XSweet service is down`)
//   }

//   return new Promise((resolve, reject) => {
//     axios({
//       method: 'post',
//       url: `${serverUrl}/api/auth`,
//       headers: { authorization: `Basic ${base64data}` },
//     })
//       .then(async ({ data }) => {
//         resolve(data.accessToken)
//       })
//       .catch(err => {
//         const { response } = err

//         if (!response) {
//           return reject(new Error(`Request failed with message: ${err.code}`))
//         }

//         const { status, data } = response
//         const { msg } = data

//         return reject(
//           new Error(`Request failed with status ${status} and message: ${msg}`),
//         )
//       })
//   })
// }

const rebuild = async url => {
  // eslint-disable-next-line
  // console.log('DOCX path: ', docxPath)

  // const serviceHealthCheck = await axios({
  //   method: 'get',
  //   url: `${serverUrl}/health`,
  // })

  // console.log('serviceHealthCheck.data', serviceHealthCheck.data)

  // // const { data: healthCheckData } = serviceHealthCheck
  // // const { message } = healthCheckData

  // return

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${serverUrl}/rebuild`,
      headers: {
        authorization: `Bearer ${flaxSiteAccessToken}`,
      },
      data: {},
    })
      .then(async res => {
        const htmledResult = res.data
        resolve(htmledResult)
      })
      .catch(async err => {
        const { response } = err
        if (!response) {
          return reject(
            new Error(
              `Flax Site request failed while  rebuilding: ${err.code}, ${err}`,
            ),
          )
        }

        const { status, data } = response
        const { msg } = data

        return reject(
          new Error(
            `Flax Site request failed while rebuilding with status ${status} and message: ${msg}`,
          ),
        )
      })
  })
}

const resolvers = {
  Mutation: {
    rebuildFlaxSite: async (_, { url }, ctx) => {
      let status = ''
      let error = ''

      try {
        status = await rebuild(url)
      } catch (e) {
        error = e
      }

      return {
        status: status ? status.message : '',
        error: error ? JSON.stringify(error) : '',
      }
    },
  },
}

const typeDefs = `
  extend type Mutation {
		rebuildFlaxSite : rebuildFlaxSiteResponse
	}

	type rebuildFlaxSiteResponse {
		status: String!
		error: String
	}
`

module.exports = { resolvers, typeDefs }
