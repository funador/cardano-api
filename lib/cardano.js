const request = require('request')
const { api, endpoints, paths } = require('./config')

// buildMethod returns a function that returns a promise
const buildMethod = endpoint => query => new Promise((resolve, reject) => {

  let path = '', badKey, badPath

  if(query) {

    for(key in query) {

      // check if the key is in the paths array
      const match = paths.includes(key)
      
      // if this is not a valid path for the endpoint, set badPath  
      if(!endpoint.path && match) {
        badPath = key
      }

      // if this is not a valid param for the endpoint, set badKey  
      if(!endpoint.params.includes(key)) {
        badKey = key
      }

      // if one of the keys matches a path, set the path for the uri
      if(match) {
        path = `/${query[key]}`
        delete query[key]
      }
    }
  }

  // reject if a query not supportted by the api is sent
  if(badKey || badPath) {
    return reject(`${badKey || badPath} is not a valid query to this endpoint`)
  }

  // reject if the endpoint requires a path but it is not provided 
  if(endpoint.path && !path) {
    return reject('please provide an address, txid, epoch or hash')
  }
  
  // build the url 
  const uri = `${api}${endpoint.url}${path}`

  request({uri, qs: query}, (err, res, body) => {
    
    if(err) {
      reject(err)
    }

    if(res.statusCode === 404 || res.statusCode === 400) {
      reject(`${res.statusCode}: ${res.statusMessage}`)
    }

    if(body) {
      resolve(JSON.parse(body))
    }
  })
})  

exports.cardano = endpoints.reduce((obj, endpoint) => {
  obj[endpoint.method] = buildMethod(endpoint)
  return obj
}, {})