var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var team = "nyg";
var url = 'http://www.espn.com/nfl/team/roster/_/name/' + team;

var nyg = {
	"name": "Giants",
	"players": []
}

request(url, function(error, response, html){
	if(!error){
		var $ = cheerio.load(html);
		
		var name, position, heightweight, links, id;
		//var json = { name : "", id : "", position : "", age : "", height : "", weight : "", experience : "", teamid : "", college: "", stats: {}};

		$('.tablehead').filter(function(){
			var data = $(this);
			
			var stopRecord = false;
			data.children().children().each(function() {
				
				var tableRowStr = $(this).text().toString();
				var allChildren = $(this).children();
				
				if (tableRowStr.includes('Offense') || tableRowStr.includes('NONAMEPOS')) {}
				else if ($(this).text().toString().includes('Defense') && !stopRecord) {
					// Stops recording once we hit defensive players
					stopRecord = true;
				}
				else if (!stopRecord) {
					// Main Iteration
					var name = allChildren.eq(1).text();
					var id = allChildren.eq(1).html().toString().match(/\d+/)[0];
					var num = allChildren.eq(0).text();
					var position = allChildren.eq(2).text();
					var age = allChildren.eq(3).text();
					var height = allChildren.eq(4).text();
					var weight = allChildren.eq(5).text();
					var experience = allChildren.eq(6).text();
					var college = allChildren.eq(7).text();
					
					var json = { name : name, id : id, num : num, position : position, age : age, height : height, weight : weight, experience : experience, teamid : team, college: college};
					
					// Gather Stats Web Request
					// ------------------------
					// ------------------------
					var newurl = 'http://www.espn.com/nfl/player/stats/_/id/' + id + '/';
					console.log("getting stats for player " + name);
					request(newurl, function(error, response, html){
						if(!error){
							var $ = cheerio.load(html);

							var rushingStats = [];
							$("td:contains('Rushing Stats')").filter(function(){
								var data = $(this);
								
								var seasonRows = data.parent().parent().children().length;
								for (i=2;i<seasonRows - 1;i++) {
									pStats = data.parent().parent().children().eq(i).children();
									
									var season = {
										"season": pStats.eq(0).text(),
										"team": pStats.eq(1).text(),
										"gamesplayed": pStats.eq(2).text(),
										"receptions": pStats.eq(3).text(),
										"rushingyards": pStats.eq(4).text(),
										"yardspercarry": pStats.eq(5).text(),
										"longestrun": pStats.eq(6).text(),
										"touchdowns": pStats.eq(7).text(),
										"firstdowns": pStats.eq(8).text(),
										"totalfumbles": pStats.eq(9).text(),
										"fumbleslost": pStats.eq(10).text()
									}
									
									rushingStats.push(season);
								}
							})
							//console.log(rushingStats);
							
							var receivingStats = [];
							$("td:contains('Receiving Stats')").filter(function(){
								var data = $(this);
								
								var seasonRows = data.parent().parent().children().length;
								for (i=2;i<seasonRows - 1;i++) {
									pStats = data.parent().parent().children().eq(i).children();
									
									var season = {
										"season": pStats.eq(0).text(),
										"team": pStats.eq(1).text(),
										"gamesplayed": pStats.eq(2).text(),
										"receptions": pStats.eq(3).text(),
										"targets": pStats.eq(4).text(),
										"receivingyards": pStats.eq(5).text(),
										"yardspercatch": pStats.eq(6).text(),
										"longestcatch": pStats.eq(7).text(),
										"touchdowns": pStats.eq(8).text(),
										"firstdowns": pStats.eq(9).text(),
										"totalfumbles": pStats.eq(10).text(),
										"fumbleslost": pStats.eq(11).text()
									}
									
									receivingStats.push(season);
								}
							})
							//console.log(receivingStats);
							
							var passingStats = [];
							$("td:contains('Passing Stats')").filter(function(){
								var data = $(this);
								
								var seasonRows = data.parent().parent().children().length;
								for (i=2;i<seasonRows - 1;i++) {
									pStats = data.parent().parent().children().eq(i).children();
									
									var season = {
										"season": pStats.eq(0).text(),
										"team": pStats.eq(1).text(),
										"gamesplayed": pStats.eq(2).text(),
										"completions": pStats.eq(3).text(),
										"attempts": pStats.eq(4).text(),
										"completionpercent": pStats.eq(5).text(),
										"passingyards": pStats.eq(6).text(),
										"yardsperpass": pStats.eq(7).text(),
										"touchdowns": pStats.eq(8).text(),
										"longestpass": pStats.eq(9).text(),
										"interceptions": pStats.eq(10).text(),
										"totalfumbles": pStats.eq(11).text(),
										"qbrating": pStats.eq(12).text(),
										"passerrating": pStats.eq(13).text()
									}
									
									passingStats.push(season);
								}
							})
							//console.log(passingStats);
							
							returnObj = {
								"rushingstats": rushingStats,
								"receivingstats": receivingStats,
								"passingstats": passingStats
							};
							
							//console.log(returnObj);
							json.stats = returnObj;

							nyg.players.push(json);
							console.log(nyg.players[0]);
						}
					})
					// ------------------------
					// ------------------------
					// ------------------------				
					
				}
			});
		})
	}
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;