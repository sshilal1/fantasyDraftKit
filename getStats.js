var fs = require('fs');
var request = require('request-promise');
var cheerio = require('cheerio');

var nygData = JSON.parse(fs.readFileSync('json/nyg-team.json', 'utf8'));

var ids = [];
for (player of nygData.players) {
	console.log(player.name);
	ids.push(player.id);
}
	
// Gather Stats Web Request
// ------------------------
// ------------------------

var calls = [];

ids.forEach(function(id){

		var url = 'http://www.espn.com/nfl/player/stats/_/id/' + id + '/';
		console.log(url);

		var returnObj = {};
		
		request(url, function(error, response, html){
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
				
				returnObj = {
					"rushingstats": rushingStats,
					"receivingstats": receivingStats,
					"passingstats": passingStats
				};

				//return returnObj;
			}
		}).then(function() {
			console.log("\n\nLoaded player: " + id);
			console.log("\n\nWriting to file...");
			//console.log(returnObj);
			//THIS IS FOR WRITING TO FILE
			
			var jsonfile = require('jsonfile');

			var file = './json/nyg/'+ id +'.json';

			jsonfile.writeFile(file, returnObj, function (err) {
				console.error(err);
			})		
		})
});

// ------------------------
// ------------------------
// ------------------------