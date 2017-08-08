const { exec, execSync } = require('child_process');
const winston = require('winston');
const fs = require('fs');
// --------------------
// --------------------
// Image builds
// --------------------
var teams = ["buf","mia","ne","nyj","bal","cin","cle","pit","hou","ind","jax","ten","den","kc","oak","lac","dal","nyg","phi","wsh","chi","det","gb","min","atl","car","no","tb","ari","lar","sf","sea"];

for (var team in teams) {
	console.log('-Downloading Images for team ' + teams[team] + '...');
	var imgdlStr = 'node ./build-modules/img-download.js ' + teams[team];
	execSync(imgdlStr, {encoding: 'utf8', stdio:[0,1,2]});

	console.log('Converting Images for team ' + teams[team] + '...');
	execSync('node ./build-modules/img-convert.js', {encoding: 'utf8', stdio:[0,1,2]});

	console.log('Deleting Images for team ' + teams[team] + '...');
	execSync('node ./build-modules/img-delete.js', {encoding: 'utf8', stdio:[0,1,2]});
}
// --------------------