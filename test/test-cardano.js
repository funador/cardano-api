const assert = require('assert')
const cardano = require('../lib/cardano')

describe('cardano api success tests', () => {

  // Supported Methods
  // ## address
  // ## blockPages
  // ## blocksTotal
  // ## block
  // ## genesisAddress
  // ## genesisPagesTotal
  // ## genesisSummary
  // ## epoch
  // ## transactionLast
  // ## transaction

  describe('cardano.address()', () => {
    it('should return information about an address', () => {
      const query = {
        address: 'DdzFFzCqrhsoTFwZkQRfYMGMvKwmej3wEbGevViniuuDPTwJoGfLYpWo2zXD8G7cz5ti3m2sz2vsheD4vskNCYVuedsPApxRdDZWJYrm'
      }

      return cardano.address(query)
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
          assert.equal(5, Object.keys(data.Right).length)
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  })

  describe('cardano.block()', () => {
    it('should return the given block', () => {
      const query = {
        hash: '52659df3f8ef7997e0dc8c04b041a956512429b95f4a28275cb53c9f6a195a70',
      }

      return cardano.block(query)
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
          assert.equal(4, Object.keys(data.Right).length)
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  })

  describe('cardano.blocksPages()', () => {
    it('should return the total amount of blocks', () => {
      const query = {
        pageSize: 10,
        page: 1
      }

      return cardano.blocksPages(query)
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  })

  describe('cardano.blockTransaction()', () => {
    it('should return information about transactions', () => {
      const query = {
        hash: '52659df3f8ef7997e0dc8c04b041a956512429b95f4a28275cb53c9f6a195a70',
        limit: 10,
        offset: 10
      }

      return cardano.blockTransaction(query)
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  })

  describe('cardano.blocksTotal()', () => {
    it('should return the total amount of blocks', () => {
      const query = {
        pageSize: 3,
      }

      return cardano.blocksTotal(query)
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  })

  describe('cardano.epoch()', () => {
    it('should return the specified epoch', () => {
      const query = {
        epoch: 3
      }

      return cardano.epoch(query)
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
          assert.equal(2160, data.Right[0])
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  })

  describe('cardano.genesisAddress()', () => {
    it('should return the genesis addresses', () => {
      const query = {
        pageSize: 10,
        redeemed: true,
        page: 3
      }

      return cardano.genesisAddress(query)
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
          assert.equal(10, data.Right.length)
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  })

  describe('cardano.genesisPagesTotal()', () => {
    it('should return the total genesis pages', () => {
      const query = {
        pageSize: 10,
        redeemed: true
      }

      return cardano.genesisPagesTotal(query)
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  })

  describe('cardano.genesisSummary()', () => {
    it('should return the genesis summary', () => {

      return cardano.genesisSummary()
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
          assert.equal(5, Object.keys(data.Right).length)
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  })

  describe('cardano.transaction()', () => {
    it('should return the specified transaction', () => {
      const query = {
        txid: 'f3d4686499fd54dcbadc1d501047aadb52b28704fb8126f10f4123d69e3ac99b'
      }

      return cardano.transaction(query)
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
          assert.equal(13, Object.keys(data.Right).length)
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  })

  describe('cardano.transactionLast()', () => {
    it('should return the last 20 transactions', () => {
      return cardano.transactionLast()
        .then(data => {
          assert.equal('Right', Object.keys(data)[0])
          assert.equal(20, data.Right.length)
        })
        .catch(err => {
          console.log('ERR', err)
        })
    })
  }) 

})