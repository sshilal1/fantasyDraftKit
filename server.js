var express = require('express');
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data

app.get('/', function (req, res) {
	res.sendFile('src/index.html', { root : __dirname });
})


var con = mysql.createConnection({
	host: "***",
	user: "***",
	password: "***",
	database: "***",
	port: 3306
});

con.connect();


http.listen(4000, function(){
	console.log('listening on *:4000');
});

app.post('/ranks', function(req, res) {
	var sql = 'SELECT * FROM ' + req.body.rankingorg + '_rankings_all';	
	con.query(sql, function (err, result) {
		res.send(result);
	})
})

app.post('/stats', function(req, res) {

	console.log(req.body);
	var filepath = './local-storage/stats/' + req.body.team + '/' + req.body.id + '.json';
	console.log(filepath);

	var parsedJson = require(filepath);
	res.send(parsedJson);
})