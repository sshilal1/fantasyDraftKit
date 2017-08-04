var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var userRankFilter = process.argv[2];
var userStartIndex = process.argv[3];

var mainUrl = "http://games.espn.com/ffl/tools/projections?";

var rankFilters = {
	"all": "",
	"qb" : "&slotCategoryId=0",
	"rb" : "&slotCategoryId=2",
	"wr" : "&slotCategoryId=4",
	"te" : "&slotCategoryId=6",
	"def" : "&slotCategoryId=16",
	"k" : "&slotCategoryId=17",
	"flex" : "&slotCategoryId=23"
};
var startIndex = "&startIndex=" + userStartIndex;
var url = mainUrl + rankFilters[userRankFilter] + startIndex;

var rankings = [];
request(url, function(error, response, html){
	if(!error){
		var $ = cheerio.load(html);
		
		var espnRank;

		$('.playerTableTable').filter(function(){
			var data = $(this);
			
			var rows = data.children().children();
						
			rowCount = 0;
			rows.each(function() {
				if(rowCount>1) {
					var rank = $(this).children().eq(0).text();
					var name = $(this).children().eq(1).children().eq(0).text();
					var id = $(this).children().eq(1).children().eq(0).attr('playerid');
					var obj = {
						"name" : name,
						"rank" : rank,
						"id" : id
					};
					rankings.push(obj)
				}
				rowCount++;
			});
		})
		
		var mysql = require('mysql');
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
			
			for (i=0;i<rankings.length;i++) {
				var sql = 'INSERT INTO espn_rankings_' + userRankFilter + ' VALUES (' + rankings[i].rank + ', "' + rankings[i].name + '", ' + rankings[i].id + ');';
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
				//console.log('INSERT INTO espn_rankings_all VALUES (' + rankings[i].rank + ', "' + rankings[i].name + '");');
			}
			con.end();
		});
	}
})