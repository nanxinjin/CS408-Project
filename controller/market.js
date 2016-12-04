var _ = require("underscore");
var moment = require("moment");

var User = require('../model/user.model');
var Market = require('../model/market.model');

module.exports = {
    postMarket: function(req, res) {
        var body = _.pick(req.body, 'title', 'content', 'contact', 'price');
        body.createdAt = moment().valueOf();
        body.sender = req.user._id;
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
    getUserMarket: function(req, res) {
        Market.find({sender: req.user._id}).sort({createdAt: -1}).exec(function(err, doc) {
            if (err) return res.status(400).send();
            res.send(doc);
        });
    },
    getAllMarket: function(req, res) {
        Market.find().sort({createdAt: -1}).exec(function(err, doc) {
            if (err) return res.status(400).send();
            res.send(doc);
        });
    },
    updateMarket: function(req, res) {
        //    var itemID = parseInt(req.params.id, 10);
        console.log(req.params.id);
        var body = _.pick(req.body, 'title', 'content', 'price');

        var attributes = {};
        if (body.hasOwnProperty('title')) {
            attributes.title = body.title;
        }
        if (body.hasOwnProperty('content')) {
            attributes.content = body.content;
        }
        if (body.hasOwnProperty('price')) {
            attributes.price = body.price;
        }

        Market.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: attributes
        }, {
            new: true
        }, function(err, doc) {
            if (err)
                res.send(err);
            res.json({
                message: 'item updated!'
            });
        });

    },
    deleteMarket: function(req, res) {

        Market.remove({
            _id: req.params.id
        }, function(err) {
            if (!err) {
                res.json({
                    message: 'item deleted successfully!'
                });
            } else {
                res.send(err);
            }
        });
    }



}
