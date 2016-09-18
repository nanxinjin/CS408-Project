var Token = require('../model/token.model');
var auth = require('../controller/auth')

module.exports = function(app) {

    app.post('/api/signup', auth.registerWithEmail);
    app.post('/api/login', auth.loginWithEmail);
    app.get('/api/getAllUsers', auth.getAllUsers);
    app.delete('/api/deletealluser', auth.deleleAllUser);
    app.post('/api/logout', auth.logout);

};
