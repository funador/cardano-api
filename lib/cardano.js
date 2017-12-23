const request = require('request')
const { api, endpoints, paths } = require('./config')

const noPathProvided = 'please provide an address, txid, epoch or hash'

// buildMethod returns a function that returns a promise
const buildMethod = endpoint => query => new Promise((resolve, reject) => {

  let path = '', badKey, badPath

  if(query) {

    Object.keys(query).forEach(key => {
      const match = paths.includes(key)
      
      // if this is not a valid path for the endpoint, set the badPath  
      if(!endpoint.path && match) {
        badPath = key
      }

      // if this is not a valid param for the endpoint, set the badKey  
      if(!endpoint.params.includes(key)) {
        badKey = key
      }

      // if one of the keys matches a path, set the path for the uri
      if(match) {
        path = `/${query[key]}`
        delete query[key]
      }
    })
  }

  // reject if a query not supportted by the api is sent
  if(badKey) return reject(`${badKey} is not a valid query to this endpoint`)

  // reject if a path not supportted by the api is sent 
  if(badPath) return reject(`${badPath} is not a valid query to this endpoint`)

  // if the endpoint requires a path but it is not provided reject
  if(endpoint.path && !path) return reject(noPathProvided) 
  
  // build the url 
  const uri = `${api}${endpoint.url}${path}`

  request({uri, qs: query}, (err, res, body) => {
    if(err) reject(err)
    if(res.statusCode === 404 || res.statusCode === 400) {
      reject(`${res.statusCode}: ${res.statusMessage}`)
    }
    if(body) resolve(JSON.parse(body))
  })
})  

exports.cardano = endpoints.reduce((obj, endpoint) => {
  obj[endpoint.method] = buildMethod(endpoint)
  return obj
}, {})