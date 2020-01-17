const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/google', { target: 'http://localhost:5555/' }));
  app.use(proxy('/api/*', { target: 'http://localhost:5555/' }));
}