var request = require('request-promise');

var url = 'https://partners.fantasypros.com/api/v1/consensus-rankings.php?experts=show&sport=NFL&year=2017&week=0&position=ALL&type=ST&scoring=PPR'

var players;
request(url, function(error, response){
	var body = JSON.parse(response.body);
	players = body.players;
}).then(function() {
	for (player of players) {
		
	}
})