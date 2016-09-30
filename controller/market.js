var _ = require("underscore");
var moment = require("moment");

var User = require('../model/user.model');
var Market = require('../model/market.model');

module.exports = {
    postMarket: function(req, res) {
        var body = _.pick(req.body, 'title', 'content', 'price');
        body.createdAt = moment().valueOf();
        var newMarket = new Market(body);
        newMarket.save(function(err, item) {
            if (err) return res.status(500).send();
            req.user.postedMarket.push(item);
            req.user.save(function(err, doc) {
                if (err) return res.status(500).send();
                res.status(204).send();
            });
        })
    },
    getAllMarket: function(req, res) {
        Market.find().exec(function (err, doc) {
            if (err) return res.status(400).send();
            res.send(doc);
        });
    },
    updateMarket: function(req, res) {
        //TODO
    },
    deleteMarket: function(req, res) {
        //TODO
    }



}
