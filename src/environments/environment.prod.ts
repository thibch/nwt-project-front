export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      login: '/auth/login',
      test: '/auth/test'
    }
  }
};
