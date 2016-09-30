var Token = require('../model/token.model');
var auth = require('../controller/auth');
var market = require('../controller/market');
var token = require('../controller/token');
var middleware = require('../middleware')();

module.exports = function(app) {

    app.post('/api/signup', auth.registerWithEmail);
    app.post('/api/login', auth.loginWithEmail);
    app.get('/api/getAllUsers', auth.getAllUsers);
    app.delete('/api/deletealluser', auth.deleleAllUser);
    app.post('/api/logout',middleware.requireAuthentication, auth.logout);

    app.get('/api/token', token.getAllToken)
    app.delete('/api/token', token.deleteAllToken);

    app.post('/api/market',middleware.requireAuthentication, market.postMarket);
    app.get('/api/market', market.getAllMarket);
};
