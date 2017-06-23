var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var async = require('async');

var nygData = JSON.parse(fs.readFileSync('nyg-team.json', 'utf8'));

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
    calls.push(function(callback) {

		var url = 'http://www.espn.com/nfl/player/stats/_/id/' + id + '/';
		console.log(url);
		
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
				//console.log(passingStats);
				
				var returnObj = {
					"rushingstats": rushingStats,
					"receivingstats": receivingStats,
					"passingstats": passingStats
				};
				
				//console.log(returnObj);
				
				for (var k=0; k < nygData.players.length; k++) {
					if (nygData.players[k].id = id) {
						nygData.players[k].stats = returnObj;
					}
				}
				
				//console.log(nygData.players[i]);
				
				/*
				//THIS IS FOR WRITING TO FILE
				var jsonfile = require('jsonfile');

				var file = '../../nyg-team-new.json';

				jsonfile.writeFile(file, nyg, function (err) {
					console.error(err);
				})
				*/
			}
			callback(null, id);
		})
    }
)});

async.parallel(calls, function(err, result) {
    /* this code will run after all calls finished the job or
       when any of the calls passes an error */

    console.log("We are Done");
	console.log(nygData);
	
	var jsonfile = require('jsonfile');
	var file = '../nyg-team-new.json';

	jsonfile.writeFile(file, nygData, function (err) {
		console.error(err);
	})
});
// ------------------------
// ------------------------
// ------------------------

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;