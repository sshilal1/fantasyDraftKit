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
							"yr": pStats.eq(0).text(),
							"tm": pStats.eq(1).text(),
							"gm": pStats.eq(2).text(),
							"att": pStats.eq(3).text(),
							"yds": pStats.eq(4).text(),
							"avg": pStats.eq(5).text(),
							"lng": pStats.eq(6).text(),
							"td": pStats.eq(7).text(),
							"fd": pStats.eq(8).text(),
							"fmt": pStats.eq(9).text(),
							"fml": pStats.eq(10).text()
						}
						// season, team, games, attempts, rushingyards, yardspercarry, longest, td, firstdowns,total fumbles, fumbleslost
						
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
							"yr": pStats.eq(0).text(),
							"tm": pStats.eq(1).text(),
							"gm": pStats.eq(2).text(),
							"rec": pStats.eq(3).text(),
							"tar": pStats.eq(4).text(),
							"yds": pStats.eq(5).text(),
							"avg": pStats.eq(6).text(),
							"lng": pStats.eq(7).text(),
							"td": pStats.eq(8).text(),
							"fd": pStats.eq(9).text(),
							"fmt": pStats.eq(10).text(),
							"fml": pStats.eq(11).text()
						}
						// season, team, games, receptions, targets, receivingyards, yardspercatch, longest, tds, fds, fumbles total, fumbles lost
						
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
							"yr": pStats.eq(0).text(),
							"tm": pStats.eq(1).text(),
							"gm": pStats.eq(2).text(),
							"cmp": pStats.eq(3).text(),
							"att": pStats.eq(4).text(),
							"cpct": pStats.eq(5).text(),
							"yds": pStats.eq(6).text(),
							"avg": pStats.eq(7).text(),
							"td": pStats.eq(8).text(),
							"lng": pStats.eq(9).text(),
							"i": pStats.eq(10).text(),
							"fmt": pStats.eq(11).text(),
							"qbr": pStats.eq(12).text(),
							"rat": pStats.eq(13).text()
						}
						// ~~ completions, attempts, %complete, total yds, avg, td, longest, ints, fm total, qbrating, passrating
						
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