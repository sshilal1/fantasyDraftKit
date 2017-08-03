var fs = require('fs');
var request = require('request-promise');
var cheerio = require('cheerio');

var team = "nyg";
var url = 'http://www.espn.com/nfl/team/roster/_/name/' + team;

var nyg = {
	"name": "Giants",
	"players": []
}

request(url, function(error, response, html){
	if(!error){
		var $ = cheerio.load(html);
		
		//var name, position, heightweight, links, id;
		//var json = { name : "", id : "", position : "", age : "", height : "", weight : "", experience : "", teamid : "", college: "", stats: {}};

		$('.tablehead').filter(function(){
			var data = $(this);
			
			var stopRecord = false;
			data.children().children().each(function() {
				
				var tableRowStr = $(this).text().toString();
				var allChildren = $(this).children();
				
				if (tableRowStr.includes('Offense') || tableRowStr.includes('NONAMEPOS')) {}
				else if ((allChildren.eq(2).text() == "C") && !stopRecord) {
					// Stops recording once we hit Centers
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
					nyg.players.push(json);
				}
				else if (allChildren.eq(2).text() == "PK") {
					var json = { 
						name : allChildren.eq(1).text(), 
						id : allChildren.eq(1).html().toString().match(/\d+/)[0], 
						num : allChildren.eq(0).text(), 
						position : "K", 
						age : allChildren.eq(3).text(), 
						height : allChildren.eq(4).text(), 
						weight : allChildren.eq(5).text(), 
						experience : allChildren.eq(6).text(), 
						teamid : team, 
						college: allChildren.eq(7).text()
					};
					nyg.players.push(json);
				}
			});
		})
	}
}).then(function() {
	console.log("\n\nDone loading team" + team);
	console.log("\n\nWriting to file...");
	console.log(nyg);
	//THIS IS FOR WRITING TO FILE
	
	var jsonfile = require('jsonfile');

	var file = './nyg-team-test.json';

	jsonfile.writeFile(file, nyg, function (err) {
		console.error(err);
	})
	
})