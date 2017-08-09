var mysql = require('mysql');

var pool = mysql.createPool({
  host: "***",
	user: "***",
	password: "***",
	database: "***",
	port: 3306
});

var filters = ["all","qb","rb","wr","te","def","k","flex"];

pool.getConnection(function(err, connection) {
	filters.forEach(function(filter,index) {
		var sql = 'CREATE TABLE yahoo_rankings_' + filter + ' (rank INTEGER PRIMARY KEY, name VARCHAR(255))';
		console.log(sql);
		connection.query(sql, function (error, results) {
		  if (error) {
		  	console.log(error.sqlMessage);
		  	console.log("Deleting Table...");
		  	connection.query(('DROP TABLE `fantasykit`.`yahoo_rankings_'+ filter + '`;'), function(error, result) {
		  		if (error) {
		  			console.log("Error deleting table...");
		  		}
		  		else {
		  			console.log("Deleted Table...");
		  			if (index==7) {
							pool.end();	
						}
		  		}	  		
		  	})
		  }
		  else {
		  	console.log("Created table");
		  	if (index==7) {
					pool.end();
				}
		  }
		});
	});
})