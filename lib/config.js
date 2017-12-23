module.exports = {
  endpoints: [
    {
      method: 'address',
      url: 'api/addresses/summary',
      path: true,
      params: ['address']
    },
    {
      method: 'block',
      url: 'api/blocks/summary',
      path: true,
      params: ['hash']
    },
    {
      method: 'blockPages',
      url: 'api/blocks/pages',
      path: false,
      params: ['page', 'pageSize']
    },
    {
      method: 'pagesTotal', 
      url: 'api/blocks/pages/total',
      path: false,
      params: ['pageSize']
    },
    {
      method: 'epoch',
      url: 'api/epochs',
      path: true,
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
      path: true,
      params: ['txid']
    },
    {
      method: 'transactionLast',
      url: 'api/txs/last',
      path: false,
      params: []
    }
  ],
  apis: [
          'https://cardanoexplorer.com', 
          'https://explorer.iohkdev.io', 
          'http://cardano-explorer.cardano-mainnet.iohk.io'
        ]
}