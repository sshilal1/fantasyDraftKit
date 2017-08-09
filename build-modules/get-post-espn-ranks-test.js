var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.espn.com/fantasy/football/story/_/page/17RanksPreseason200PPR/2017-fantasy-football-ppr-rankings-top-200";

//var rankings = [];
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
				var stuff = $(this).children().eq(0);
				var rank = stuff.children().eq(0).text();
				var name = stuff.children().eq(1).text();
				var pos = stuff.children().eq(2).text();
				console.log(stuff.text());
				//console.log("rank " + rank + " name " + name + " pos " + pos);
				/*
				var rank = $(this).children().eq(0).text();
				var name = $(this).children().eq(1).children().eq(0).text();
				var id = $(this).children().eq(1).children().eq(0).attr('playerid');
				var obj = {
					"name" : name,
					"rank" : rank,
					"id" : id
				};
				rankings.push(obj)
				*/
			});
		})
	}
})