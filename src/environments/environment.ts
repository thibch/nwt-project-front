// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
      roll: '/cards/user/:idUser/roll',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
