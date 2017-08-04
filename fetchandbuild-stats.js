const { exec, execSync } = require('child_process');

console.log('**Building espn rankings tables...');
execSync('node ./server-modules/build-ranks.js', {encoding: 'utf8', stdio:[0,1,2]});

var filters = ["all","qb","rb","wr","te","def","k","flex"];
var numplayers = [400,40,120,160,40,32,32,200];

console.log('**Populating espn rankings table');
for (var i=0; i<filters.length; i++) {
	for (var iters = 0; iters < numplayers[i]; iters+=40) {
		console.log('-Gathering ' + filters[i] + ' players: ' + iters + ' to ' + (iters+40));
		var teamExecStr = 'node ./server-modules/get-post-espn-ranks.js ' + filters[i] + ' ' + iters;
		execSync(teamExecStr, {encoding: 'utf8', stdio:[0,1,2]});
	}
}