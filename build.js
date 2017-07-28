const { exec, execSync } = require('child_process');
const winston = require('winston');
const fs = require('fs');

// --------------------
// Setup Logging
// --------------------
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
	  	colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/info.log`,
      timestamp: tsFormat,
	  	level: 'info'
    })
  ]
});

// --------------------
// --------------------
logger.info('Downloading Images...');
execSync('node img-download.js', {encoding: 'utf8', stdio:[0,1,2]});

logger.info('Converting Images...');
execSync('node img-convert.js', {encoding: 'utf8', stdio:[0,1,2]});

/*
console.log('Grabbing Version first...');
setTimeout(function() {
  console.log(execSync('ping 172.30.177.70', {encoding: 'utf8'}));

  setTimeout(function() {
		console.log('Grabbing Version 2nd...');
		console.log(execSync('node -v', {encoding: 'utf8'}));

		setTimeout(function() {
			console.log('Grabbing Version 3rd...');
			console.log(execSync('node -v', {encoding: 'utf8'}));

			setTimeout(function() {
				console.log('Grabbing Version 4th...');
				console.log(execSync('node -v', {encoding: 'utf8'}));

				setTimeout(function() {
					console.log('Grabbing Version 5th...');
					console.log(execSync('node -v', {encoding: 'utf8'}));
				}, 2000);
			}, 2000);
		}, 2000);
	}, 2000);
}, 2000);
*/

//console.log(execSync('node downloadImages.js', {encoding: 'utf8'}));
//console.log(execSync('node convertImages.js', {encoding: 'utf8'}));