const sharp = require('sharp');
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
      filename: './logs/img-delete.log',
      timestamp: tsFormat,
	  	level: 'info'
    })
  ]
});

// --------------------
// --------------------

var files = fs.readdirSync('./src/images/download/');

for (var i in files) {
	const pNum = parseInt(files[i],10);
	logger.info("Deleting image: " + files[i]);

	var fileLoc = './src/images/download/'+pNum+'.png';
	try {
		fs.unlinkSync(fileLoc);
		logger.info("Succesfully deleted file");
	}
	catch(err) {
		logger.info("Failed to delete file");
	}
}