var _ = require("underscore");

var Token = require('../model/token.model');

module.exports = {
    getAllToken: function(req, res) {
        Token.find().exec(function (err, doc) {
            if (err) return res.status(400).send();
            res.send(doc);
        });
    },
    deleteAllToken: function(req, res) {
        Token.remove({}, function(err) {
            if (err) {
                res.status(500).send();
            } else {
                res.status(204).send();
            }
        });
    }



}
