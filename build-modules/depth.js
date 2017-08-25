var fs = require('fs');
var request = require("request-promise");
var cheerio = require('cheerio');
var mysql = require('mysql');

var url = 'http://fftoolbox.scout.com/football/depth-charts.cfm';
var allPlayers = [];

request(url, function(error, response, html){
	if(!error){
		var $ = cheerio.load(html);

		$('#startcontent').filter(function(){
			var data = $(this);
			
			var teams = data.children();
						
			teamCount = 0;
			teams.each(function() {
				var team = $(this);
				// skip the first 7 children (not teams)
				
				var teamName = team.children().eq(0).children().eq(1).text();
				var players = team.children().eq(1).children();

				var hrefProp = team.children().eq(0).children().eq(1).attr('href');
				if (hrefProp) {
					var teamId = hrefProp.match(/=(\w+)/)[1];
				}
				else
					var teamId = "none";
				
				if(teamCount>8 && (teamName != "")) {

					console.log('\n' + teamName + ' ' + teamId + '\n');

					players.each(function() {
						var player = $(this);

						var depth = player.first().text().split(' ').shift();		
						var playerName = player.children().last().text();

						var obj = {
							"name": playerName,
							"depth": depth,
							"team": teamName,
							"teamid": teamId
						}
						allPlayers.push(obj);
					})
				}
				teamCount++;
			});
		})
	}
}).then(function() {

	console.log("\n\nDone loading depth charts");

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
		
		for (player of allPlayers) {
			var sql = 'INSERT INTO depth_teams VALUES ("' + player.name + '", "' + player.depth + '", "' + player.team + '", "' + player.teamid + '");';
			console.log(sql);
			try {
				errorF = false;
				con.query(sql, function (err, result) {
					if (err) throw err;
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