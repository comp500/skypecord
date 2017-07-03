const Skyweb = require('skyweb');
var skyweb = new Skyweb();
var creds = require('../creds.json');
skyweb.login(creds.skypeuser, creds.skypepass).then(function (skypeAccount) {
	console.log('Skyweb is initialized now');
}).catch(function (e) {
	console.error(e);
});