const { exec, execSync } = require('child_process');

console.log('Grabbing Version first...');
setTimeout(function() {
  console.log(execSync('node -v', {encoding: 'utf8'}));

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





//console.log(execSync('node downloadImages.js', {encoding: 'utf8'}));
//console.log(execSync('node convertImages.js', {encoding: 'utf8'}));