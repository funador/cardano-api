module.exports = {
  endpoints: [
    {
      method: 'address',
      url: 'api/addresses/summary',
      path: 'address',
      params: ['address']
    },
    {
      method: 'block',
      url: 'api/blocks/summary',
      path: 'hash',
      params: ['hash']
    },
    {
      method: 'blocksPages',
      url: 'api/blocks/pages',
      path: false,
      params: ['page', 'pageSize']
    },
    {
      method: 'blockTransaction',
      url: 'api/blocks/txs',
      path: 'hash',
      params: ['hash', 'limit', 'offset']
    },
    {
      method: 'blocksTotal', 
      url: 'api/blocks/pages/total',
      path: false,
      params: ['pageSize']
    },
    {
      method: 'epoch',
      url: 'api/epochs',
      path: 'epoch',
      params: ['epoch', 'slot']
    },
    {
      method: 'genesisAddress',
      url: 'api/genesis/address',
      path: false,
      params: ['page', 'pageSize', 'redeemed']
    },
    {
      method: 'genesisPagesTotal',
      url: 'api/genesis/address/pages/total',
      path: false,
      params: ['pageSize', 'redeemed']
    },
    {
      method: 'genesisSummary',
      url: 'api/genesis/summary',
      path: false,
      params: []
    },
    {
      method: 'transaction',
      url: 'api/txs/summary',
      path: 'txid',
      params: ['txid']
    },
    {
      method: 'transactionLast',
      url: 'api/txs/last',
      path: false,
      params: []
    }
  ],
  paths: ['epoch', 'txid', 'hash', 'address'],
  api: 'https://cardanoexplorer.com'
}