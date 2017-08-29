const { exec, execSync } = require('child_process');
const winston = require('winston');
const fs = require('fs');
// --------------------
// --------------------
// Setup Logging
// --------------------
const logDir = 'logs';
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
      filename: `${logDir}/updates.log`,
      timestamp: tsFormat,
	  	level: 'info'
    })
  ]
});
// --------------------
// --------------------
// Rankings update
// --------------------

logger.info('**Building Sql Tables...');
exec('node ./build-modules/sql-build-table.js espn', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
exec('node ./build-modules/sql-build-table.js pros', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
exec('node ./build-modules/sql-build-table.js yahoo', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

logger.info('**Gathering espn rankings...');
exec('node ./build-modules/get-post-espn-ranks.js', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

logger.info('**Gathering pros rankings...');
exec('node ./build-modules/get-post-pros-ranks.js', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

logger.info('**Gathering yahoo rankings...');
exec('node ./build-modules/get-post-yahoo-ranks.js', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

// --------------------
