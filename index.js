// require bots
const Skyweb = require('skyweb');
const Eris = require("eris");
const creds = require('../creds.json');

var skyweb = new Skyweb();
var discord = new Eris(creds.discordtoken);
var skywebReady = false;
var discordReady = false;

skyweb.login(creds.skypeuser, creds.skypepass).then(function (skypeAccount) {
	console.log('Skyweb ready!');
	skywebReady = true;
	console.log('Your contacts : ' + JSON.stringify(skyweb.contactsService.contacts, null, 2));
}).catch(function (e) {
	console.error(e);
});

bot.on("ready", () => { // When the bot is ready
    console.log("Discord ready!"); // Log "Ready!"
	discordReady = true;
});

