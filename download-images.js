var fs = require('fs');
var nygData = JSON.parse(fs.readFileSync('nyg-team.json', 'utf8'));
var download = require('image-downloader')

for (var k=0; k < nygData.players.length; k++) {

	var id = nygData.players[k].id;
	var imageurl = "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/" + id + ".png";
	var dest = 'images/' + id + '.png';
	var shrunk = 'images/' + id + '.jpg';

	const options = {
	  url: imageurl,
	  dest: dest                  // Save to /path/to/dest/image.jpg 
	}

	download.image(options)
	.then(({ filename, image }) => {
	    console.log('File saved to', filename);
	}).catch((err) => {
	    console.log('couldnt load image for id');
	})

}