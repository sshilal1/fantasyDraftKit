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
	
	var sql = "CREATE TABLE depth_teams (name VARCHAR(255), depth VARCHAR(255), team VARCHAR(255), teamid VARCHAR(255))";
	con.query(sql, function (err, result) {
		if (err) throw err;
		
		console.log("Table created");
		con.end();
	});
});