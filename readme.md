# cardano-api

Wrapper for the [Cardano Explorer API](https://cardanodocs.com/technical/explorer/api/).  

```js
const cardano = require('cardano-api')

const address = 'DdzFFzCqrht8iQ2utWYssBnfGvSqkGfM7fxHXZWoB57ormT17td1CY4Eye7bADF6HpeGC57vwV5ZPzmVjiZRQEkAD9Rc4P8LDF7FfYne'

// promise
cardano.address({address})
  .then(data => console.log('promise', data))
  .catch(err => console.log('err', err))

// async/await
const myCardanoFunc = async address => {
  try {
    const data = await cardano.address(address)
    console.log('async/await', data)  
  }
  catch(err) { console.log(err) }
}

myCardanoFunc({address})
```

# Endpoints

#### cardano.address() - [/api/addresses/summary/{address}](https://cardanodocs.com/technical/explorer/api/#path--api-addresses-summary--address-)

```js
// Get summary information about an address
const query = {
    address: 'Ae2tdP...fQwGpm'  // Required, wallet address to check
}

cardano.address(query)
  .then(data => console.log('address', data))
```

#### cardano.block() - [/api/blocks/summary/{hash}](https://cardanodocs.com/technical/explorer/api/#path--api-blocks-summary--hash-)
```js
// Get block's summary information
const query = {
    hash: '52659d...195a70' // Required, block hash to check
}

cardano.block(query)
  .then(data => console.log('block', data))
```

#### cardano.blockTransaction() - [/api/blocks/txs/{hash}](https://cardanodocs.com/technical/explorer/api/#path--api-blocks-txs--hash-)
```js
// Get brief information about transaction based on blocks
// For info on specific transactions use cardano.transaction()
const query = {
    hash: '52659d...195a70',    // Required, block hash to check
    limit: 10,                  // Optional
    offset: 2                   // Optional
}

cardano.blockTransaction(query)
  .then(data => console.log('blockTransaction', data))
```

#### cardano.blocksTotal() - [/api/blocks/pages/total](https://cardanodocs.com/technical/explorer/api/#path--api-blocks-pages-total)

```js
// Get the list of total pages
const query = {
    pageSize: 3 // Optional
}

cardano.blocksTotal(query)
  .then(data => console.log('blocksTotal', data))
```

#### cardano.genesisAddress() - [/api/genesis/address/pages](https://cardanodocs.com/technical/explorer/api/#path--api-genesis-address-pages)

```js
const query = {
    page: 1,        // Optional
    pageSize: 3,    // Optional
    redeemed: true  // Optional
}

cardano.genesisAddress(query)
  .then(data => console.log('genesisAddress', data))
```

#### cardano.genesisPagesTotal() - [/api/genesis/address/pages/total](https://cardanodocs.com/technical/explorer/api/#path--api-genesis-address-pages-total)

```js
const query = {
    pageSize: 3,    // Optional
    redeemed: true  // Optional
}

cardano.genesisPagesTotal(query)
  .then(data => console.log('genesisPagesTotal', data))
```

#### cardano.genesisSummary() - [/api/genesis/summary](https://cardanodocs.com/technical/explorer/api/#path--api-genesis-summary)

```js
cardano.genesisSummary()
  .then(data => console.log('genesisSummary', data))
```

#### cardano.epoch() - [/api/search/epoch/{epoch}](https://cardanodocs.com/technical/explorer/api/#path--api-search-epoch--epoch-)

```js
// Search the blocks by epoch and slot
const query = {
    epoch: 3,   // Required, epoch to check
    slot: 24    // Optional
}

cardano.epoch(query)
  .then(data => console.log('epoch', data))
```

#### cardano.transaction() - [/api/txs/summary/{txid}](https://cardanodocs.com/technical/explorer/api/#path--api-txs-summary--txid-)

```js
// Get summary information about a transaction
const query = {
    txid: 'f3d468...3ac99b' // Required, transaction to check
}

cardano.transaction(query)
  .then(data => console.log('transaction', data))
```

#### cardano.transactionLast() - [/api/txs/last](https://cardanodocs.com/technical/explorer/api/#path--api-txs-last)

```js
// Get information about the 20 latest transactions
cardano.transactionLast()
  .then(data => console.log('transactionLast', data))
```

### Issues

Something not working?  Please [open an issue](https://github.com/funador/cardano-api/issues)

### Test

``` npm test```