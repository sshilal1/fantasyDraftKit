const download = require('image-downloader');
const winston = require('winston');
const fs = require('fs');

// --------------------
// Setup Logging
// --------------------
const tsFormat = () => (new Date()).toLocaleTimeString();
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: 'logs/img-download.log',
      timestamp: tsFormat,
	  	level: 'info'
    })
  ]
});

// --------------------
// --------------------

var nygData = JSON.parse(fs.readFileSync('json/nyg-team.json', 'utf8'));

for (var k=0; k < nygData.players.length; k++) {

	var id = nygData.players[k].id;
	var imageurl = "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/" + id + ".png";
	var dest = 'src/images/' + id + '.png';

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