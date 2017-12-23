const request = require('request')
const { api, endpoints } = require('./config')

const noPathAllowed = 'no address, txid, epoch or hash query allowed'
const noPathProvided = 'please provide an address, txid, epoch or hash'
const paths = ['epoch', 'txid', 'hash', 'address']

const buildMethod = endpoint => query => 
  new Promise((resolve, reject) => {
    let params = '', path = ''
    let stopper, keyTrack
    
    if(query) {

      if(!endpoint.path && query.path) return reject(noPathAllowed)
      
      params = Object.keys(query).reduce((params, key) => {
        
        if(!endpoint.params.includes(key)) {
          stopper = true
          keyTrack = key
        }

        if(paths.includes(key)) {
          path = `/${query[key]}`
          return params
        }

        params += `${key}=${query[key]}&`
        return params

      }, '')
      
      params = params ? `?${params.replace(/\&$/, '')}` : ''

      if(stopper) return reject(`${keyTrack} is not a valid query to this endpoint`)
    }

    if(endpoint.path && !path) return reject(noPathProvided) 
    
    const url = `${api}/${endpoint.url}${path}${params}`

    request(url, (err, res, body) => {
      if(body) resolve(JSON.parse(body))
      if(res.statusCode === 404 || res.statusCode === 400) reject(res.statusMessage)
      if(err) reject(err)
    })
  })  

exports.cardano = endpoints.reduce((obj, endpoint) => {
  obj[endpoint.method] = buildMethod(endpoint)
  return obj
}, {})