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
	database: "fantasykit",
	port: 3306
});

con.connect();

http.listen(3000, function(){
	console.log('listening on *:3000');
});

app.post('/ranks', function(req, res) {
	
	console.log("request received for", req.body);
	
	var sql = 'SELECT * FROM espn_rankings_all';

	con.query(sql, function (err, result) {
		console.log("result is ", result);
		res.send(result);
	})
})