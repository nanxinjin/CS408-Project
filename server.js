var express = require('express');
var cors = require('./services/cors');

var app = express();
var PORT = process.env.PORT || 3001;
var MONGO_URI = process.env.MONGODB_URI || 'localhost:27017/cs408';

app.use(cors);
app.use(express.static(__dirname + '/public'));

var http = require('http').Server(app);
http.listen(PORT, function() {
	console.log('Server listening on ' + PORT);
});
