const assert = require('assert')
const cardano = require('../lib/cardano')

describe('cardano api error tests', () => {

  // Supported Methods
  // ## address
  // ## blocksPages
  // ## blocksTotal
  // ## block
  // ## genesisAddress
  // ## genesisPagesTotal
  // ## genesisSummary
  // ## epoch
  // ## transactionLast
  // ## transaction

  describe('cardano.address()', () => {
    it('should return message on a bad address', () => {
      const query = {
        address: 'DdzFFzCqrhso...uedsPApxRdDZWJYrm'
      }

      return cardano.address(query)
        .then(data => {
          assert.equal('Left', Object.keys(data)[0])
          assert.equal('Invalid Cardano address!', data.Left)
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })

    it('should return message with no query', () => {

      return cardano.address()
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal(`'address' key is required to query this endpoint`, err)
        })
    })

    it('should return message with bad query', () => {
      const query = {
        pages: 3
      }

      return cardano.address(query)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal('pages is not a valid query to this endpoint', err)
        })
    })
  })

  describe('cardano.block()', () => {
    it('should return message on bad hash', () => {
      const query = {
        hash: '52659df3f8ef79...4a28275cb53c9f6a195a70',
      }

      return cardano.block(query)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal('400: Bad Request', err)
        })
    })

    it('should return message on no query', () => {

      return cardano.block()
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal(`'hash' key is required to query this endpoint`, err)
        })
    })
  })

  describe('cardano.blocksPages()', () => {
    it('should return message on bad query', () => {
      const query = {
        hash: '52659df3f8ef79...4a28275cb53c9f6a195a70',
      }

      return cardano.blocksPages(query)
        .then(data => { 
          console.log(data)
        })
        .catch(err => {
          assert.equal('hash is not a valid query to this endpoint', err)
        })
    })
  })

  describe('cardano.blockTransaction()', () => {
    it('should return message on bad query', () => {
      const query = {
        hash: '52659df3f8ef79...4a28275cb53c9f6a195a70',
        limit: 10,
        offset: 10
      }

      return cardano.blockTransaction(query)
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
        })
        .catch(err => {
          assert.equal('400: Bad Request', err)
        })
    })
  })

  describe('cardano.blocksTotal()', () => {
    it('should return the total amount of blocks', () => {
      const query = {
        pageSized: 3,
      }

      return cardano.blocksTotal(query)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal('pageSized is not a valid query to this endpoint', err)
        })
    })
  })

  describe('cardano.epoch()', () => {
    it('should return message on bad epoch', () => {
      const query = {
        epoch: 'three'
      }

      return cardano.epoch(query)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal('404: Not Found', err)
        })
    })

    it('should return message on no epoch', () => {

      return cardano.epoch()
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal(`'epoch' key is required to query this endpoint`, err)
        })
    })
  })

  describe('cardano.genesisAddress()', () => {
    it('should return err on bad query addresses', () => {
      const query = {
        pageSized: 10,
        redeemed: true,
        page: 3
      }

      return cardano.genesisAddress(query)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal('pageSized is not a valid query to this endpoint', err)
        })
    })
  })

  describe('cardano.genesisPagesTotal()', () => {
    it('should return err on bad query', () => {
      const query = {
        pageSized: 10,
        redeemed: true
      }

      return cardano.genesisPagesTotal(query)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal('pageSized is not a valid query to this endpoint', err)
        })
    })
  })

  describe('cardano.transaction()', () => {
    it('should return message on bad txid', () => {
      const query = {
        txid: 'f3d4686499fd54dcbadc...10f4123d69e3ac99b'
      }

      return cardano.transaction(query)
        .then(data => {
          assert.equal('Invalid transaction id!', data.Left)
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })

    it('should return message with no query', () => {

      return cardano.transaction()
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal(`'txid' key is required to query this endpoint`, err)
        })
    })
  })

  describe('cardano.transactionLast()', () => {
    it('should return the last 20 transactions', () => {
      const query = {
        this: this
      }
      return cardano.transactionLast(query)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          assert.equal('this is not a valid query to this endpoint', err)
        })
    })
  }) 

})