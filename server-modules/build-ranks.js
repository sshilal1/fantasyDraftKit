var mysql = require('promise-mysql');
var connection;

mysql.createConnection({
	host: "***",
	user: "***",
	password: "***",
	database: "***",
	port: 3306
}).then(function(con){
	console.log("\nConnected!");
	connection = con;

	var filters = ["all","qb","rb","wr","te","def","k","flex"];

	filters.forEach(function(filter,index) {
		var sql = 'CREATE TABLE espn_rankings_' + filter + ' (rank INTEGER PRIMARY KEY, name VARCHAR(255), id INTEGER)';
		connection.query(sql, function (err, result) {
			if (err) {
				console.log(err.sqlMessage + ", Deleting all rows...");
				//connection.query('DELETE * FROM espn_rankings_all');
			}
			else {
				console.log("Table created");
			}
		})
	});

	connection.end();
})
