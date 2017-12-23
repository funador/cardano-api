const request = require('request')
const { api, endpoints } = require('./config')

const noPathAllowed = 'no address, txid, epoch or hash query allowed'
const noPathProvided = 'please provide an address, txid, epoch or hash'
const paths = ['epoch', 'txid', 'hash', 'address']

const buildMethod = endpoint => query => new Promise((resolve, reject) => {
    let path = '', params = ''
    let stopper
    
    if(query) {

      if(!endpoint.path && query.path) return reject(noPathAllowed)
      
      params = Object.keys(query).reduce((str, key) => {
        
        if(!endpoint.params.includes(key)) {
          stopper = key
        }

        if(paths.includes(key)) {
          path = `/${query[key]}`
          return str
        }

        str += `${key}=${query[key]}&`
        return str

      }, '')
      
      params = params ? `?${params.replace(/\&$/, '')}` : ''

      if(stopper) return reject(`${stopper} is not a valid query to this endpoint`)
    }

    if(endpoint.path && !path) return reject(noPathProvided) 
    
    const url = `${api}${endpoint.url}${path}${params}`

    request(url, (err, res, body) => {
      if(err) reject(err)
      if(res.statusCode === 404 || res.statusCode === 400) reject(res.statusMessage)
      if(body) resolve(JSON.parse(body))
    })
  })  

exports.cardano = endpoints.reduce((obj, endpoint) => {
  obj[endpoint.method] = buildMethod(endpoint)
  return obj
}, {})