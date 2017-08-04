const winston = require('winston');
const fs = require('fs');
const jsonfile = require('jsonfile');

// --------------------
// Setup Logging
// --------------------
const tsFormat = () => (new Date()).toLocaleTimeString();
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: 'logs/build-all-players.log',
      timestamp: tsFormat,
	  	level: 'info'
    })
  ]
});

// --------------------
// --------------------

var files = fs.readdirSync('src/teams/');
var total = {
	players: []
};

for (var i in files) {
	const team = files[i].toString().substring(0,3);
	logger.info("--**Adding players from " + team + " to total players**--");
	var teamloc = './src/teams/' + files[i];

	var teamPlayers = jsonfile.readFileSync(teamloc);
	for (var player in teamPlayers.players) {
		logger.info("Adding " + teamPlayers.players[player].name);
		total.players.push(teamPlayers.players[player]);
	}

	jsonfile.writeFileSync("./src/allplayers.json", total);
}