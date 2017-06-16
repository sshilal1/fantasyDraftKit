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
		color2: '#C60C30'
	},
	mia: {
		name: 'Dolphins',
		city: 'Miami',
		color1: '#008E97',
		color2: '#F58220'
	},
	ne: {
		name: 'Patriots',
		city: 'New England',
		color1: '#002244',
		color2: '#C60C30'
	},
	nyj: {
		name: 'Jets',
		city: 'New York',
		color1: '#203700',
		color2: '#ffffff'
	},
	// North
	bal: {
		name: 'Ravens',
		city: 'Baltimore',
		color1: '#241773',
		color2: '#9E7C0C'
	},
	cin: {
		name: 'Bengals',
		city: 'Cincinatti',
		color1: '#FB4F14',
		color2: '#000000'
	},
	cle: {
		name: 'Browns',
		city: 'Cleveland',
		color1: '#FB4F14',
		color2: '#22150C'
	},
	pit: {
		name: 'Steelers',
		city: 'Pittsburgh',
		color1: '#FFB612',
		color2: '#000000'
	},
	// South
	hou: {
		name: 'Texans',
		city: 'Houston',
		color1: '#03202F',
		color2: '#A71930'
	},
	ind: {
		name: 'Colts',
		city: 'Indianapolis',
		color1: '#002C5F',
		color2: '#A5ACAF'
	},
	jac: {
		name: 'Jaguars',
		city: 'Jacksonville',
		color1: '#006778',
		color2: '#D7A22A'
	},
	ten: {
		name: 'Titans',
		city: 'Tennessee',
		color1: '#002244',
		color2: '#4B92DB'
	},
	// West
	den: {
		name: 'Broncos',
		city: 'Denver',
		color1: '#002244',
		color2: '#FB4F14'
	},
	kc: {
		name: 'Chiefs',
		city: 'Kansas City',
		color1: '#E31837',
		color2: '#000000'
	},
	oak: {
		name: 'Raiders',
		city: 'Oakland',
		color1: '#A5ACAF',
		color2: '#000000'
	},
	sd: {
		name: 'Chargers',
		city: 'San Diego',
		color1: '#FFB612',
		color2: '#002244'
	},
	// NFC
	// East
	dal: {
		name: 'Cowboys',
		city: 'Dallas',
		color1: '#002244',
		color2: '#B0B7BC'
	},
	nyg: {
		name: 'Giants',
		city: 'New York',
		color1: '#0B2265',
		color2: '#A71930'
	},
	phi: {
		name: 'Eagles',
		city: 'Philidelphia',
		color1: '#004953',
		color2: '#A5ACAF'
	},
	was: {
		name: 'Redskins',
		city: 'Washington',
		color1: '#773141',
		color2: '#FFB612'
	},
	// North
	chi: {
		name: 'Bears',
		city: 'Chicago',
		color1: '#0B162A',
		color2: '#C83803'
	},
	det: {
		name: 'Lions',
		city: 'Detroit',
		color1: '#005A8B',
		color2: '#B0B7BC'
	},
	gb: {
		name: 'Packers',
		city: 'Green Bay',
		color1: '#203731',
		color2: '#FFB612'
	},
	min: {
		name: 'Vikings',
		city: 'Minnesota',
		color1: '#4F2683',
		color2: '#FFC62F'
	},
	// South
	atl: {
		name: 'Falcons',
		city: 'Atlanta',
		color1: '#A71930',
		color2: '#000000'
	},
	car: {
		name: 'Panthers',
		city: 'Carolina',
		color1: '#0085CA',
		color2: '#000000'
	},
	no: {
		name: 'Saints',
		city: 'New Orleans',
		color1: '#9F8958',
		color2: '#000000'
	},
	tb: {
		name: 'Buccaneers',
		city: 'Tampa Bay',
		color1: '#D50A0A',
		color2: '#000000'
	},
	// West
	arz: {
		name: 'Cardinals',
		city: 'Arizona',
		color1: '#97233F',
		color2: '#000000'
	},
	ram: {
		name: 'Rams',
		city: 'Los Angeles',
		color1: '#002244',
		color2: '#B3995D'
	},
	sf: {
		name: '49ers',
		city: 'San Francisco',
		color1: '#AA0000',
		color2: '#B3995D'
	},
	sea: {
		name: 'Seahawks',
		city: 'Seattle',
		color1: '#002244',
		color2: '#69BE28'
	}
};

var x = '.tablehead';

//for (team in teams) {
	team = 'nyg';
	url = 'http://www.espn.com/nfl/team/roster/_/name/' + team;
	
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			
			var name, position, heightweight, team, links, id;
			var json = { name : "", position : "", heightweight : "", team : ""};

			$('.tablehead').filter(function(){
				var data = $(this);
				
				firstPlayer =  data.children().children().eq(2);
				links = firstPlayer.children().eq(1).html().toString();
				id = links.match(/\d+/)[0];
				name = firstPlayer.children().eq(1).text();
				
			})
						
			console.log(name);
			console.log(id);
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

			$('.player-stats').filter(function(){
				var data = $(this);
				
				name = data.children().first().text();
				name = name.replace(' Stats','');
				json.name = name;
			})
			
			$('.general-info').filter(function(){
				var data = $(this);
				
				position = data.children().eq(0).text();
				heightweight = data.children().eq(1).text();
				team = data.children().last().children().text();
				
				json.position = position;
				json.heightweight = heightweight;
				json.team = team;
			})
			
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