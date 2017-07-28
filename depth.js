var fs = require('fs');
var request = require("request-promise");
var cheerio = require('cheerio');

var url = 'http://fftoolbox.scout.com/football/depth-charts.cfm';

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
				
				if(teamCount>8 && (teamName != "")) {

					console.log('\n' + teamName + '\n');

					players.each(function() {
						var player = $(this);

						var depth = player.first().text().split(' ').shift();		
						var playerName = player.children().last().text();

						console.log(playerName + ": " + depth);
					})
				}
				teamCount++;
			});
		})
	}
}).then(function() {
	console.log("\n\nDone loading teams"); 
})