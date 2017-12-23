const request = require('request')
const { apis, endpoints } = require('./config')

const noPathAllowed = 'no path is allowed with this method'
const noPathProvided = 'please pass a txn, epoch or hash into this method'
const paths = ['epoch', 'txid', 'hash', 'address']

const buildMethod = endpoint => query => 
  new Promise((resolve, reject) => {
    let stopper, nameTrack
    let params = '', path = ''

    if(query) {

      if(!endpoint.path && query.path) {
        return reject(noPathAllowed)
      }
      
      // delete query.path
      
      params = Object.keys(query).reduce((params, name) => {
        
        // check to see if the params is in the list
        if(!endpoint.params.includes(name)) {
          stopper = true
          nameTrack = name
        }

        if(paths.includes(name)) {
          path = `/${query[name]}`
          return params
        }

        params += `${name}=${query[name]}&`
        return params
      }, '')

      params = params ? `?${params.replace(/\&$/, '')}` : ''
      
      if(stopper) return reject(`${nameTrack} is not a valid query to this endpoint`)
    }

    if(endpoint.path && !path) return reject(noPathProvided) 

    request(`${apis[0]}/${endpoint.url}${path}${params}`, (err, res, body) => {
      if(body) resolve(JSON.parse(body))
      if(res.statusCode === 404 || res.statusCode === 400) reject(res.statusMessage)
      if(err) reject(err)
    })
  })  

const cardano = endpoints.reduce((obj, endpoint) => {
  obj[endpoint.method] = buildMethod(endpoint)
  return obj
}, {})

exports.cardano = cardano 