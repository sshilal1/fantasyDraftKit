const download = require('image-downloader');
const winston = require('winston');
const fs = require('fs');

var team = process.argv[2];

// --------------------
// Setup Logging
// --------------------
const tsFormat = () => (new Date()).toLocaleTimeString();
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: './logs/img-download.log',
      timestamp: tsFormat,
	  	level: 'info'
    })
  ]
});

// --------------------
// --------------------
const dlDir = './src/images/download';

// Create the dl directory if it does not exist
if (!fs.existsSync(dlDir)) {
	fs.mkdirSync(dlDir);
}

var teamLoc = './local-storage/teams/' + team + '-team.json';
var teamData = JSON.parse(fs.readFileSync(teamLoc, 'utf8'));

for (var k=0; k < teamData.players.length; k++) {

	var id = teamData.players[k].id;
	var imageurl = "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/" + id + ".png";
	var dest = './src/images/download/' + id + '.png';

	const options = {
	  url: imageurl,
	  dest: dest
	}

	download.image(options)
	.then(({ filename, image }) => {
	    logger.info('File saved to', filename);
	}).catch((err) => {
	    logger.info('couldnt load image for id');
	})

}