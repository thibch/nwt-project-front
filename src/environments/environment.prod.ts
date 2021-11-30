export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      login: '/auth/login',
      test: '/auth/test',
      getById: '/users/:id',
      allUser: '/users',
      allCard: '/cards',
      getCardById: '/cards/:id',
      allCollectionByUserId: '/collections/users/:id',
      allNotificationsById: '/notifications/users/:id',
      getNotificationById: '/notifications/:id',
      allTradeByWaitingId: '/trades/users/waiting/:id',
      allTradeBySecondId: '/trades/users/second/:id',
      trades: '/trades',
      notifications: '/notifications',
      allCollectionTradableByUserId: '/collections/users/tradable/:id',
      collectionByUserIdByCardId: '/collections/:idUser/:idCard',
      tradeDecline: '/trades/decline/:id',
      tradeAccept: '/trades/accept/:id'
    }
  }
};
