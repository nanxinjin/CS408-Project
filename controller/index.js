var express = require('express');
var _ = require("underscore");
var router = express.Router();

module.exports = {

    homePage: function(req, res) {
        res.render('index', { title: 'iStudy' });
    }

}
