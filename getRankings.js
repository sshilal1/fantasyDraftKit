var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var url = "http://www.espn.com/fantasy/football/story/_/page/17RanksPreseason200PPR/2017-fantasy-football-ppr-rankings-top-200";

request(url, function(error, response, html){
	if(!error){
		var $ = cheerio.load(html);
		
		var espnRank;

		$('.inline-table').filter(function(){
			var data = $(this);
			
			var tables = data.children().children().first();
						
			if(tables.text().toString().includes('Top-200 PPR rankings')) {
				data.children().children().eq(2).children().each(function() {
					var tableRowStr = $(this).text().toString();
					console.log(tableRowStr);
				});
				//console.log(myTable);
			}
			
			//console.log(data.children().children().text());
			/*
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
					
					teams[team].players.push(json);
				}
			});
			*/
		})
		
		/*
		//THIS IS FOR WRITING TO FILE
		var jsonfile = require('jsonfile');

		var file = 'espn_rankings.json';

		jsonfile.writeFile(file, espnRank, function (err) {
			console.error(err);
		})
		*/
	}
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;