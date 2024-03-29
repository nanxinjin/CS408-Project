var _ = require("underscore");

var User = require('../model/user.model');
var Token = require('../model/token.model');

module.exports = {
    registerWithEmail: function(req, res) {
        var body = _.pick(req.body, 'email', 'password', 'displayName');
        var newUser = new User(body);
        console.log('get body = ' + JSON.stringify(req.body));
        newUser.save(function(err, user) {
            console.log('err: ' + err);
            if (err) return res.status(400).json(err);
            var token = user.generateToken();

            var t = new Token({token: token});

            t.save(function(err, doc) {
                if (err) return res.status(400).json(err);
                var resUser = user.toPublicJSON();
                resUser.Auth = doc.get('token')
                res.status(200).send(resUser);
            });
            // res.sendStatus(200);
        });
    },
    loginWithEmail: function(req, res) {
        var body = _.pick(req.body, 'email', 'password');
        console.log('log in email and pwd' + JSON.stringify(body));
        User.getAuthenticated(body).then(function(user) {
            console.log('login get user : ' + user);
            var token = user.generateToken();
    		userInstance = user;

            var t = new Token({token: token});

            return t.save();

    	}).then(function(tokenInstance) {
            console.log('get resUser: ' + userInstance.toPublicJSON());
            var resUser = userInstance.toPublicJSON();
            console.log('get resUser: ' + resUser);
            resUser.Auth = tokenInstance.get('token')
            console.log('get resUser2: ' + resUser);
            res.status(200).send(resUser);
    	}).catch(function(e) {
            console.log('error: ' + e);
    		res.status(401).json(e);
    	});
    },
    logout: function(req, res) {
        Token.findById(req.token._id).remove(function(err) {
            if (err) {
                return res.status(500).send();
            } else {
                res.status(200).send();
            }
        })
    },
    getAllUsers: function(req, res) {
        User.find().exec(function (err, users) {
            if (err) return res.status(400).send();
            res.send(users);
        });
    },
    deleleAllUser: function(req, res) {
        User.remove({}, function(err) {
            if (err) {
                res.status(500).send();
            } else {
                res.status(204).send();
            }
        });
    }


}
