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
      allNotificationsById: '/notifications/users/:id'
    }
  }
};
