const request = require('request')
const { api, endpoints, paths } = require('./config')

// buildMethod returns a function that returns a promise
const buildMethod = endpoint => query => new Promise((resolve, reject) => {

  // declare path and badKey variables 
  let path = '', badKey

  // check in a query object is passed in
  if (query) {

    // loop over the query object
    for (key in query) {

      // check if the key is in the paths array
      const match = paths.includes(key)

      // if this is not a valid key for the endpoint, set badKey
      if (!endpoint.path && match || !endpoint.params.includes(key)) {
        badKey = key
      }

      // if one of the keys matches a path, set the path for the uri
      // then delete the key to remove from the query string
      if (match) {
        path = `/${query[key]}`
        delete query[key]
      }
    }
  }

  // reject if a query not supported by the api is sent
  if (badKey) {
    return reject(`${badKey} is not a valid query to this endpoint`)
  }

  // reject if the endpoint requires a path but it is not provided 
  if (endpoint.path && !path) {
    return reject(`'${endpoint.path}' key is required to query this endpoint`)
  }
  
  // Build up the uri to query
  const uri = `${api}/${endpoint.url}${path}`

  request({uri, qs: query}, (err, res, body) => {
    
    // if there is an error from the api, reject with that error
    if (err) {
      return reject(err)
    }

    // if there is a 404 or 400 error from the api, reject with that error
    if (res.statusCode === 404 || res.statusCode === 400) {
      return reject(`${res.statusCode}: ${res.statusMessage}`)
    }

    // if there is a body in the response, resolve with the body
    if (body) {
      return resolve(JSON.parse(body))
    }
  })
})  

// reduce the endpoints array to build the methods on the cardano object 
// and then export that object
module.exports = endpoints.reduce((obj, endpoint) => {
  obj[endpoint.method] = buildMethod(endpoint)
  return obj
}, {})