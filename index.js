Skyweb = require('skyweb');
var skyweb = new Skyweb();
skyweb.login(process.argv[2], process.argv[3]).then(function (skypeAccount) {
	console.log('Skyweb is initialized now');
});