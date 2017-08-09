var request = require('request-promise');
var mysql = require('mysql');

// std https://partners.fantasypros.com/api/v1/consensus-rankings.php?experts=show&sport=NFL&year=2017&week=0&id=1054&position=QB&type=ST&scoring=&callback=FPW.rankingsCB
// ppr https://partners.fantasypros.com/api/v1/consensus-rankings.php?experts=show&sport=NFL&year=2017&week=0&position=ALL&type=ST&scoring=PPR
var url = 'https://partners.fantasypros.com/api/v1/consensus-rankings.php?sport=NFL&year=2017&week=0&position=ALL&type=ST&scoring=PPR'
var userRankFilter = "all";

var players;
request(url, function(error, response){
	var body = JSON.parse(response.body);
	players = body.players;
}).then(function() {
	var con = mysql.createConnection({
		host: "***",
	user: "***",
	password: "***",
	database: "***",
	port: 3306
	});
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		
		for (player of players) {
			var sql = 'INSERT INTO yahoo_rankings_all VALUES (' + player.rank_ecr + ', "' + player.player_name + '", ' + player.pos_rank.match(/\d+/g) + ');';
			console.log(sql);
			try {
				errorF = false;
				con.query(sql, function (err, result) {
					if (err) errorF = true;
					else console.log("Entry added");
				});			
				if (errorF) throw err;
			}
			catch (e) {
				console.log("Error adding player " + rankings[i].name);
			}
		}
		con.end();
	});
})