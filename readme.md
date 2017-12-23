# cardano-api

Promise wrapper for the [Cardano API](https://cardanodocs.com/technical/explorer/api/).  
### do not use at the moment, pls!

```js
const { cardano } = require('cardano-api')

const query = {
    path: 'Ae2tdPwU...fQwGpm' // the address to query
}

// promise
cardano.address(query)
  .then(data => console.log('address', data))
  .catch(err => console.log('err', err))

// async/await
const myCardanoFunc = async () => {
  try {
    const data = await cardano.address(query)
    console.log(data)  
  }
  catch(err) { console.log(err) }
}

myCardanoFunc()
```

# Supported Endpoints

#### cardano.address() - [/api/addresses/summary/{address}](https://cardanodocs.com/technical/explorer/api/#path--api-addresses-summary--address-)




```js
// Get summary information about an address
const query = {
    path: 'Ae2tdPwU...fQwGpm' // Required, wallet address to check
}

cardano.address(query)
  .then(data => console.log('address', data))
```

#### cardano.block() - [/api/blocks/summary/{hash}](https://cardanodocs.com/technical/explorer/api/#path--api-blocks-summary--hash-)
```js
// 
const query = {
    path: 'Ae2tdPwU...fQwGpm' // Required, block hash to check
}

cardano.block(query)
  .then(data => console.log('block', data))
```

#### cardano.pagesTotal() - [/api/blocks/pages/total](https://cardanodocs.com/technical/explorer/api/#path--api-blocks-pages-total)
Get the list of total pages

```js
const query = {
    pageSize: 3 // Optional
}

cardano.pagesTotal(query)
  .then(data => console.log('blockTotal', data))
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

#### cardano.genesisSummary() - [/api/genesis/address/pages/total](https://cardanodocs.com/technical/explorer/api/#path--api-genesis-summary)

```js
cardano.genesisSummary()
  .then(data => console.log('genesisSummary', data))
```

#### cardano.epoch() - [/api/search/epoch/{epoch}](https://cardanodocs.com/technical/explorer/api/#path--api-search-epoch--epoch-)

```js
const query = {
    path: 3,    // Required, epoch to check
    slot: 24    // Optional
}

cardano.epoch(query)
  .then(data => console.log('epoch', data))
```

#### cardano.transaction() - [/api/txs/summary/{txid}](https://cardanodocs.com/technical/explorer/api/#path--api-txs-summary--txid-)

```js
const query = {
    path: 'Ae2tdPwU...fQwGpm' // Required, transaction to check
}

cardano.transaction(query)
  .then(data => console.log('transaction', data))
```

#### cardano.transactionLast() - [/api/txs/last](https://cardanodocs.com/technical/explorer/api/#path--api-txs-last)

```js
cardano.transactionLast()
  .then(data => console.log('transactionLast', data))
```


- A couple of the endpoints are represented with breaking changes in the official documentation, assume that more could change in the future

### test

``` npm test```