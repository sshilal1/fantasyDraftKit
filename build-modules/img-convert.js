const sharp = require('sharp');
const winston = require('winston');
const fs = require('fs');

// --------------------
// Setup Logging
// --------------------
const tsFormat = () => (new Date()).toLocaleTimeString();
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: './logs/img-convert.log',
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
	logger.info("Converting and compressing image: " + files[i]);

	sharp('./src/images/download/'+pNum+'.png')
		.background({r: 255, g: 255, b: 255, alpha: 1})
		.flatten()
		.jpeg({quality: 100})
		.resize(90, 65)
		.toFile('./src/images/'+pNum+'.jpg');
}