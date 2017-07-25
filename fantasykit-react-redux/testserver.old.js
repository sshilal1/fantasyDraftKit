var express = require('express');
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data

app.get('/', function (req, res) {
	res.sendFile('public/index.html', { root : __dirname });
})

var con = mysql.createConnection({
	host: "***",
	user: "sshilal1",
	password: "***",
	database: "fantasykit",
	port: 3306
});

con.connect();

http.listen(3000, function(){
	console.log('listening on *:3000');
});

app.post('/ranks', function(req, res) {
	
	var name = req.body.name;
	console.log("request received for", name);
	
	var sql = 'SELECT rank FROM espn_rankings_all WHERE name=\'' + name + '\';';

	con.query(sql, function (err, result) {
		console.log("result is ", result);
		res.send(result);
	})
})