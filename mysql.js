var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "fantasydb"
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