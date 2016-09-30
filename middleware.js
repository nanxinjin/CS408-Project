var cryptojs = require('crypto-js');
var Token = require('./model/token.model');
var User = require('./model/user.model');


module.exports = function () {
	return {
		requireAuthentication: function(req, res, next) {
			console.log('get to middleware');
			var token = req.get('Auth');
            if (typeof token === "undefined") {
                return res.status(401).send();
            }
            // console.log("token get: " + token);
			Token.findOne({
				tokenHash: cryptojs.MD5(token).toString()
			}).then(function(tokenInstance) {
                // console.log("find instance: " + tokenInstance);
				if (!tokenInstance) {
					throw new Error('no token find');
				}

				req.token = tokenInstance;
				return User.findByToken(token);
			}).then(function(user) {
				req.user = user;
				next();
			}).catch(function(err) {
                console.log("in middleware invalid:" + err);
				res.status(401).send(err);
			})
		}
	}
};
