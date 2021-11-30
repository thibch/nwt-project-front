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
      allCollectionTradableByUserId: '/collections/users/tradable/:id'
    }
  }
};
