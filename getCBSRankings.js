var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var userAmountToStore = 80;
var userRankFilter = "te";

var mainUrl = "https://www.fantasypros.com/nfl/rankings/";

var rankFilters = {
	"all": "consensus",
	"qb" : "qb",
	"rb" : "rb",
	"wr" : "wr",
	"te" : "te",
	"def" : "dst",
	"k" : "k"
};
var url = mainUrl + rankFilters[userRankFilter] + "-cheatsheets.php";

var rankings = [];
request(url, function(error, response, html){
	if(!error){
		var $ = cheerio.load(html);

		$('#data').filter(function(){
			var data = $(this);
			
			var rows = data.children().last().children();
			
			rowCount = 0;
			rows.each(function() {
				
				var rank = $(this).children().eq(0).text();
				var name = $(this).children().eq(1).children().eq(0).text();
				
				if(isNaN(rank) || (name == ('')) || rowCount < 1 || rowCount > userAmountToStore) {}
				else {								
					var obj = {
						"name" : name,
						"rank" : rank
					};
					rankings.push(obj)
				}
				rowCount++;
			});
		})
		
		console.log(rankings);
		
		/*
		var mysql = require('mysql');
		var con = mysql.createConnection({
			host: "***",
			user: "sshilal1",
			password: "***",
			database: "fantasykit",
			port: 3306
		});
		con.connect(function(err) {
			if (err) throw err;
			console.log("Connected!");
			
			var sql = 'CREATE TABLE espn_rankings_' + userRankFilter + ' (rank INTEGER PRIMARY KEY, name VARCHAR(255))';
			con.query(sql, function (err, result) {
				if (err) 
					console.log('Error creating table espn_rankings_' + userRankFilter);
				else
					console.log("Table created");
			});
			
			for (i=0;i<rankings.length;i++) {
				var sql = 'INSERT INTO espn_rankings_' + userRankFilter + ' VALUES (' + rankings[i].rank + ', "' + rankings[i].name + '");'
				try {
					errorF = false;
					con.query(sql, function (err, result) {
						if (err) errorF = true;
						else console.log("Entry added");
					});			
					if (errorF) throw err;
				}
				catch (e) {
					console.log("Error adding player " + rankings[i].name);
				}
				//console.log('INSERT INTO espn_rankings_all VALUES (' + rankings[i].rank + ', "' + rankings[i].name + '");');
			}
		});*/
	}
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;