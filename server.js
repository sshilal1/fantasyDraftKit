var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

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