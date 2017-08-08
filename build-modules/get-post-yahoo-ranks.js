var request = require('request-promise');

// std https://partners.fantasypros.com/api/v1/consensus-rankings.php?experts=show&sport=NFL&year=2017&week=0&id=1054&position=QB&type=ST&scoring=&callback=FPW.rankingsCB
// ppr https://partners.fantasypros.com/api/v1/consensus-rankings.php?experts=show&sport=NFL&year=2017&week=0&position=ALL&type=ST&scoring=PPR&callback=FPW.rankingsCB
var url = 'https://partners.fantasypros.com/api/v1/consensus-rankings.php?experts=show&sport=NFL&year=2017&week=0&position=ALL&type=ST&scoring=PPR'

var players;
request(url, function(error, response){
	var body = JSON.parse(response.body);
	players = body.players;
}).then(function() {
	for (player of players) {
		
	}
})