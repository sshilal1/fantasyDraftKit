var diff = require('deep-diff').diff;
var fs = require('fs');
var oldData = JSON.parse(fs.readFileSync('nyg-team.json', 'utf8'));
var newData = JSON.parse(fs.readFileSync('nyg-team-new.json', 'utf8'));

var lhs = oldData;
var rhs = newData;

var differences = diff(lhs, rhs);

for (difference in differences) {

	var oldRank = differences[difference].lhs;
	
	for (player in lhs.players) {
		if (lhs.players[player].rank == oldRank) {
			console.log("Rank changed for '" + lhs.players[player].name + "' from " + oldRank + " to " + differences[difference].rhs);
			
			console.log("Setting new rank in json object...");
			lhs.players[player].rank = differences[difference].rhs;
		}
	}
}

setTimeout(function() {
	console.log("Writing new rank to file...");
	fs.writeFileSync('nyg-team.json', JSON.stringify(lhs)); 
}, 2000);