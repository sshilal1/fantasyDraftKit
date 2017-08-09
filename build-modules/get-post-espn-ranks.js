var fs = require('fs');
var request = require('request-promise');
var cheerio = require('cheerio');
var mysql = require('mysql');

var url = "http://www.espn.com/fantasy/football/story/_/page/17RanksPreseason200PPR/2017-fantasy-football-ppr-rankings-top-200";

var rankings = [];
request(url, function(error, response, html){
	if(!error){
		var $ = cheerio.load(html);
		
		var espnRank;

		$('.inline-table').filter(function(){
			var data = $(this);
			//console.log(data.children().eq(2).text());
			
			var rows = data.children().eq(2).children();
						
			rowCount = 0;
			rows.each(function() {
				var playerposteam = $(this).children().eq(0);
				var rank = playerposteam.text().match(/\d+/g);
				var name = playerposteam.children().eq(0).text();
				var posrank = $(this).children().eq(1).text();
				
				var regexexp = /\d+. (\w+)/g;
				if (posrank.includes('D/ST')) {
					name = regexexp.exec(playerposteam.text())[1];
				}

				var obj = {
					"name" : name,
					"rank" : rank,
					"pos_rank" : posrank.match(/\d+/g)
				};
				rankings.push(obj);

				console.log("rank: " + rank + " name: " + name + " pos rank: " + posrank.match(/\d+/g));

			});
		})
	}
}).then(function() {
	var con = mysql.createConnection({
		host: "***",
		user: "***",
		password: "***",
		database: "***",
		port: 3306
	});
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		
		for (player of rankings) {
			var sql = 'INSERT INTO espn_rankings_all VALUES (' + player.rank + ', "' + player.name + '", ' + player.pos_rank + ');';
			console.log(sql);
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
		}
		con.end();
	});
})