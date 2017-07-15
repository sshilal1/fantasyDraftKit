//https://stackoverflow.com/questions/41332643/sending-data-to-database-in-react-js-web-application/41332811#41332811

var mysql = require('mysql');
var express = require('express');
var app = express();
var fs = require("fs");

var path = require('path');
var nygFile = path.join(__dirname, '/src/nyg-team.json');

var nygData = fs.readFileSync(nygFile);

var con = mysql.createConnection({
	host: "***",
	user: "sshilal1",
	password: "***",
	database: "fantasykit",
	port: 3306
});

con.connect();

app.post('/ranks', function(req, res) {

	var name = req.body;
	console.log(name);
	var sql = 'SELECT rank FROM espn_rankings_all WHERE name=\'' + name + '\';';

	con.query(sql, function (err, result) {
		console.log("result is " + result);
		res.send(result);
	})

	/*con.query(sql, function (err, rows) {
		if (err) throw err;
		
		for(var player of nygData.players) {
			console.log(player.name);
			for (var i in rows) {
				if (rows[i].includes(player.name)) {
					console.log(player.name + "'s rank is " + rows[i].rank);
					rankings[player.name] = rows[i].rank;
				}
			}
		}
		console.log(rows);
	});*/
})

/*app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;*/
//east2-mysql-instance1.c9cuq70xxmoo.us-east-1.rds.amazonaws.com"