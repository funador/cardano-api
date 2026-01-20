const request = require('request')
const { api, endpoints, paths } = require('./config')
const buildMethod = require('./build-method');

// reduce the endpoints array to build the methods on the cardano object
// and then export that object
module.exports = endpoints.reduce((obj, endpoint) => {
  obj[endpoint.method] = buildMethod(endpoint, api)
  return obj
}, {})
