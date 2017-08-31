var fs = require('fs');
var request = require("request-promise");
var cheerio = require('cheerio');
var mysql = require('mysql');

var team = process.argv[2];
var teamFileString = 'local-storage/matchups/' + team + '.json';

var url = 'http://www.espn.com/nfl/team/schedule/_/name/' + team + '/';
console.log(url);

var matchups = [];

request(url, function(error, response, html){
	if(!error){
		var $ = cheerio.load(html);

		var rushingStats = [];
		$("#my-teams-table").filter(function(){
			var data = $(this);
			
			var weeks = data.children().eq(0).children().eq(0).children().eq(5).children().eq(0).children().eq(0).children().eq(0).children();

			var weekCount = 0;
			weeks.each(function() {
				var weekRow = $(this);

				var week = weekRow.children().eq(0).text();
				var hrefProp = weekRow.children().eq(2).children().eq(0).children().eq(1).children().eq(0).attr('href');
				if (hrefProp) {
					var teamId = hrefProp.match(/name\/(\w+)/)[1];
				}
				else
					var teamId = "BYE";

				if (weekCount > 8 && teamId != "") {
					console.log(week + ' ' + teamId);
					var weekObj = {
						week: week,
						teamid: teamId
					}
					matchups.push(weekObj);
				}
				weekCount++;
			})
		})
	}
}).then(function() {
	console.log("\n\nDone loading matchups");
	console.log("\n\nWriting to File...");

	var jsonfile = require('jsonfile');

	jsonfile.writeFile(teamFileString, matchups, function (err) {
		console.error(err);
	})
})

