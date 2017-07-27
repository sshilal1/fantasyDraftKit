var sharp = require('sharp');
var fs = require('fs');

var files = fs.readdirSync('./images/');

for (var i in files) {

	const pNum = parseInt(files[i],10);
	console.log(pNum);
	sharp('images/'+pNum+'.png')
		.background({r: 255, g: 255, b: 255, alpha: 1})
		.flatten()
		.jpeg({quality: 100})
		.resize(90, 65)
		.toFile('images/jpgs/'+pNum+'.jpg');
}