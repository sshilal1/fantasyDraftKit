var fs = require('fs');
var request = require('request-promise');
var cheerio = require('cheerio');

var mainUrl = "http://games.espn.com/ffl/tools/projections?";
var url = mainUrl;

var rankings = [];
request(url, function(error, response, html){
	if(!error){
		var $ = cheerio.load(html);
		
		var espnRank;

		$('.playerTableTable').filter(function(){
			var data = $(this);
			
			var rows = data.children().children();
						
			rowCount = 0;
			rows.each(function() {
				if(rowCount>1) {
					var rank = $(this).children().eq(0).text();
					var name = $(this).children().eq(1).children().eq(0).text();
					var id = $(this).children().eq(1).children().eq(0).attr('playerid');
					var pos = $(this).children().eq(1).children().contents();
					var obj = {
						"name" : name,
						"rank" : rank,
						"id" : id,
						"pos" : pos
					};
					rankings.push(obj)
				}
				rowCount++;
			});
		})
	}
}).then(function() {
	console.log(rankings[0]);
	console.log(rankings[1]);
})