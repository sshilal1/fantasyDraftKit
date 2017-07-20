var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.sendFile('public/index.html', { root : __dirname });
})

http.listen(3000, function(){
	console.log('listening on *:3000');
});