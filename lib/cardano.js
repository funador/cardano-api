const request = require('request')
const { api, endpoints } = require('./config')

const noPathAllowed = 'no address, txid, epoch or hash query allowed'
const noPathProvided = 'please provide an address, txid, epoch or hash'
const paths = ['epoch', 'txid', 'hash', 'address']

// buildMethod returns a function that returns a promise
const buildMethod = endpoint => query => new Promise((resolve, reject) => {

  let path = '', params = '', badKey
  
  if(query) {

    // if trying to set a path in the query but path is not available for this
    // endpoint, then reject
    if(!endpoint.path && query.path) return reject(noPathAllowed)

    Object.keys(query).forEach(key => {

      // if this is not a valid param for the endpoint, set the badKey  
      if(!endpoint.params.includes(key)) {
        badKey = key
      }

      // if one of the keys matches a path, set the path for the url
      if(paths.includes(key)) {
        path = `/${query[key]}`
        delete query[key]
      }
    })
  }

  // if a query not supportted by the api is sent reject
  if(badKey) return reject(`${badKey} is not a valid query to this endpoint`)

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