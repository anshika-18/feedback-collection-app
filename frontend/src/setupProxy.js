const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use('/auth/google',
    proxy.createProxyMiddleware({ target: 'http://localhost:5000' })
    );
    app.use('/api/*',
    proxy.createProxyMiddleware({ target: 'http://localhost:5000'})
    );
    
}