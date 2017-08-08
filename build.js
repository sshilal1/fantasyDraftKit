const { exec, execSync } = require('child_process');
const winston = require('winston');
const fs = require('fs');
// --------------------
// --------------------
// Setup Logging & Directories
// --------------------
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}
const storageDir = 'local-storage';
if (!fs.existsSync(storageDir)) {
	fs.mkdirSync(storageDir);
}
const teamDir = 'local-storage/teams';
if (!fs.existsSync(teamDir)) {
	fs.mkdirSync(teamDir);
}
const statsDir = 'local-storage/stats';
if (!fs.existsSync(statsDir)) {
	fs.mkdirSync(statsDir);
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
// Rankings build (async)
// --------------------
/*
logger.info('**Gathering espn rankings...');
exec('node fetchandbuild-stats.js', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
*/
// --------------------
// --------------------
// Team build
// --------------------
var teams = ["buf","mia","ne","nyj","bal","cin","cle","pit","hou","ind","jax","ten","den","kc","oak","lac","dal","nyg","phi","wsh","chi","det","gb","min","atl","car","no","tb","ari","lar","sf","sea"];

for (var team in teams) {
	logger.info('-Building team: ' + teams[team] + '...');
	var teamExecStr = 'node ./build-modules/buildteam.js ' + teams[team];
	execSync(teamExecStr, {encoding: 'utf8', stdio:[0,1,2]});
}

logger.info('**Building Single Team Object...');
execSync('node ./build-modules/build-players.js', {encoding: 'utf8', stdio:[0,1,2]});

// --------------------
// --------------------
// Stats Build
// --------------------
for (var team in teams) {
	logger.info('-Building stats for players on: ' + teams[team] + '...');
	var teamExecStr = 'node ./build-modules/getstats.js ' + teams[team];
	execSync(teamExecStr, {encoding: 'utf8', stdio:[0,1,2]});
}

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