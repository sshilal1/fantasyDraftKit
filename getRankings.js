var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var url = "http://games.espn.com/ffl/tools/projections?startIndex=0";
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
	}
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;