var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('./services/cors');

var app = express();
var PORT = process.env.PORT || 3001;
var MONGO_URI = process.env.MONGODB_URI || 'localhost:27017/cs408';

mongoose.connect(MONGO_URI, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


require('./app/router')(app);

var http = require('http').Server(app);
http.listen(PORT, function() {
	console.log('Server listening on ' + PORT);
});
