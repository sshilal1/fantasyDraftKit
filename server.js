var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
const sql   = require('mssql');

app.get('/scrape', function(req, res){

    url = 'http://www.imdb.com/title/tt1229340/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            $('.title_wrapper').filter(function(){
                var data = $(this);
                title = data.children().first().text();

                release = data.children().last().children().text();

                json.title = title;
                json.release = release;
            })

            // Since the rating is in a different section of the DOM, we'll have to write a new jQuery filter to extract this information.

            $('.star-box-giga-star').filter(function(){
                var data = $(this);

                // The .star-box-giga-star class was exactly where we wanted it to be.
                // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

                rating = data.text();

                json.rating = rating;
            })
        }
    })
})

var teams = {
	// East
	buf: {
		name: 'Bills',
		city: 'Buffalo',
		color1: '#00338D',
		color2: '#C60C30',
		players: {},
		offseason: {}
	},
	mia: {
		name: 'Dolphins',
		city: 'Miami',
		color1: '#008E97',
		color2: '#F58220',
		players: {},
		offseason: {}
	},
	ne: {
		name: 'Patriots',
		city: 'New England',
		color1: '#002244',
		color2: '#C60C30',
		players: {},
		offseason: {}
	},
	nyj: {
		name: 'Jets',
		city: 'New York',
		color1: '#203700',
		color2: '#ffffff',
		players: {},
		offseason: {}
	},
	// North
	bal: {
		name: 'Ravens',
		city: 'Baltimore',
		color1: '#241773',
		color2: '#9E7C0C',
		players: {},
		offseason: {}
	},
	cin: {
		name: 'Bengals',
		city: 'Cincinatti',
		color1: '#FB4F14',
		color2: '#000000',
		players: {},
		offseason: {}
	},
	cle: {
		name: 'Browns',
		city: 'Cleveland',
		color1: '#FB4F14',
		color2: '#22150C',
		players: {},
		offseason: {}
	},
	pit: {
		name: 'Steelers',
		city: 'Pittsburgh',
		color1: '#FFB612',
		color2: '#000000',
		players: {},
		offseason: {}
	},
	// South
	hou: {
		name: 'Texans',
		city: 'Houston',
		color1: '#03202F',
		color2: '#A71930',
		players: {},
		offseason: {}
	},
	ind: {
		name: 'Colts',
		city: 'Indianapolis',
		color1: '#002C5F',
		color2: '#A5ACAF',
		players: {},
		offseason: {}
	},
	jac: {
		name: 'Jaguars',
		city: 'Jacksonville',
		color1: '#006778',
		color2: '#D7A22A',
		players: {},
		offseason: {}
	},
	ten: {
		name: 'Titans',
		city: 'Tennessee',
		color1: '#002244',
		color2: '#4B92DB',
		players: {},
		offseason: {}
	},
	// West
	den: {
		name: 'Broncos',
		city: 'Denver',
		color1: '#002244',
		color2: '#FB4F14',
		players: {},
		offseason: {}
	},
	kc: {
		name: 'Chiefs',
		city: 'Kansas City',
		color1: '#E31837',
		color2: '#000000',
		players: {},
		offseason: {}
	},
	oak: {
		name: 'Raiders',
		city: 'Oakland',
		color1: '#A5ACAF',
		color2: '#000000',
		players: {},
		offseason: {}
	},
	sd: {
		name: 'Chargers',
		city: 'San Diego',
		color1: '#FFB612',
		color2: '#002244',
		players: {},
		offseason: {}
	},
	// NFC
	// East
	dal: {
		name: 'Cowboys',
		city: 'Dallas',
		color1: '#002244',
		color2: '#B0B7BC',
		players: {},
		offseason: {}
	},
	nyg: {
		name: 'Giants',
		city: 'New York',
		color1: '#0B2265',
		color2: '#A71930',
		players: [],
		offseason: {}
	},
	phi: {
		name: 'Eagles',
		city: 'Philidelphia',
		color1: '#004953',
		color2: '#A5ACAF',
		players: {},
		offseason: {}
	},
	was: {
		name: 'Redskins',
		city: 'Washington',
		color1: '#773141',
		color2: '#FFB612',
		players: {},
		offseason: {}
	},
	// North
	chi: {
		name: 'Bears',
		city: 'Chicago',
		color1: '#0B162A',
		color2: '#C83803',
		players: {},
		offseason: {}
	},
	det: {
		name: 'Lions',
		city: 'Detroit',
		color1: '#005A8B',
		color2: '#B0B7BC',
		players: {},
		offseason: {}
	},
	gb: {
		name: 'Packers',
		city: 'Green Bay',
		color1: '#203731',
		color2: '#FFB612',
		players: {},
		offseason: {}
	},
	min: {
		name: 'Vikings',
		city: 'Minnesota',
		color1: '#4F2683',
		color2: '#FFC62F',
		players: {},
		offseason: {}
	},
	// South
	atl: {
		name: 'Falcons',
		city: 'Atlanta',
		color1: '#A71930',
		color2: '#000000',
		players: {},
		offseason: {}
	},
	car: {
		name: 'Panthers',
		city: 'Carolina',
		color1: '#0085CA',
		color2: '#000000',
		players: {},
		offseason: {}
	},
	no: {
		name: 'Saints',
		city: 'New Orleans',
		color1: '#9F8958',
		color2: '#000000',
		players: {},
		offseason: {}
	},
	tb: {
		name: 'Buccaneers',
		city: 'Tampa Bay',
		color1: '#D50A0A',
		color2: '#000000',
		players: {},
		offseason: {}
	},
	// West
	arz: {
		name: 'Cardinals',
		city: 'Arizona',
		color1: '#97233F',
		color2: '#000000',
		players: {},
		offseason: {}
	},
	ram: {
		name: 'Rams',
		city: 'Los Angeles',
		color1: '#002244',
		color2: '#B3995D',
		players: {},
		offseason: {}
	},
	sf: {
		name: '49ers',
		city: 'San Francisco',
		color1: '#AA0000',
		color2: '#B3995D',
		players: {},
		offseason: {}
	},
	sea: {
		name: 'Seahawks',
		city: 'Seattle',
		color1: '#002244',
		color2: '#69BE28',
		players: {},
		offseason: {}
	}
};

var x = '.tablehead';

//for (team in teams) {
	var team = 'nyg';
	url = 'http://www.espn.com/nfl/team/roster/_/name/' + team;
	
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			
			var name, position, heightweight, links, id;
			var json = { name : "", id : "", position : "", age : "", height : "", weight : "", experience : "", teamid : "", college: ""};

			$('.tablehead').filter(function(){
				var data = $(this);
				
				//firstPlayer =  data.children().children().eq(2);
				//links = firstPlayer.children().eq(1).html().toString();
				//id = links.match(/\d+/)[0];
				//bname = firstPlayer.children().eq(1).text();
				
				console.log(data.children().children().length);
				
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
						
						var json = { name : name, id : id, num : num, position : position, age : age, height : height, weight : weight, experience : experience, teamid : team, college: college, stats: {}};
						
						teams[team].players.push(json);
					}
				});
				
				var nygstr = teams["nyg"];
				console.log(teams["nyg"]);
				/* THIS IS FOR WRITING TO FILE
				var jsonfile = require('jsonfile');

				var file = 'nyg-team.json';

				jsonfile.writeFile(file, nygstr, function (err) {
					console.error(err);
				})*/
			})
		}
	})
//}

ids = [14879,2977644]
url = 'http://www.espn.com/nfl/player/stats/_/id/2977644/';

for (id of ids) {
	
	url = 'http://www.espn.com/nfl/player/stats/_/id/' + id + '/';
	
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var name, position, heightweight, team, stats;
			var json = { name : "", position : "", heightweight : "", team : "", stats : {}};
			
			$("td:contains('Rushing Stats')").filter(function(){
				var data = $(this);
				
				stats = data.parent().parent().children().eq(3).children().first().text();
				
				json.stats = stats;
			})
			
			console.log(json);
		}
	})
}

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;