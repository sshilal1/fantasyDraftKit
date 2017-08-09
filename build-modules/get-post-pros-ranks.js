var request = require('request-promise');
var cheerio = require('cheerio');
var mysql = require('mysql');

var userAmountToStore = 350;
var userRankFilter = "all";

var mainUrl = "https://www.fantasypros.com/nfl/rankings/";

var rankFilters = {
	"all": "consensus",
	"qb" : "qb",
	"rb" : "rb",
	"wr" : "wr",
	"te" : "te",
	"def" : "dst",
	"k" : "k"
};
var url = mainUrl + rankFilters[userRankFilter] + "-cheatsheets.php";

var rankings = [];
request(url, function(error, response, html){
	if(!error){
		var $ = cheerio.load(html);

		$('#data').filter(function(){
			var data = $(this);
			
			var rows = data.children().last().children();
			
			rowCount = 0;
			rows.each(function() {
				
				var rank = $(this).children().eq(0).text();
				var name = $(this).children().eq(1).children().eq(0).text();
				var posrank = $(this).children().eq(2).text();
				
				if(isNaN(rank) || (name == ('')) || rowCount < 1 || rowCount > userAmountToStore) {}
				else {								
					var obj = {
						"name" : name,
						"rank" : rank,
						"pos_rank" : posrank.match(/\d+/g).toString()
					};
					rankings.push(obj)
				}
				rowCount++;
			});
		})	
	}
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
		
		for (player of rankings) {
			var sql = 'INSERT INTO pros_rankings_all VALUES (' + player.rank + ', "' + player.name + '", ' + player.pos_rank + ');';
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