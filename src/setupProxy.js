const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api',{
        target: 'http://localhost:8000',
        changeOrigin: true
    }))
    app.use(proxy('/bpi',{
        target: 'http://localhost:8000',
        changeOrigin: true
    }))
};