var mysql = require('mysql');

var con = mysql.createConnection({
	host: "***",
	user: "sshilal1",
	password: "***",
	database: "fantasykit",
	port: 3306
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	
	var sql = "CREATE TABLE teams (id INTEGER PRIMARY KEY, city VARCHAR(255), name VARCHAR(255), abbrev)";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table created");
	});
});

con.end();