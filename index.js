// require bots
const Skyweb = require('skyweb');
const Eris = require("eris");
const creds = require('./creds.json');

var skyweb = new Skyweb();
var discord = new Eris(creds.discordtoken);
var skywebReady = false;
var discordReady = false;
var skypeQueue = [];
var discordQueue = [];
var discordChannel;
var lastID = null;

skyweb.login(creds.skypeuser, creds.skypepass).then(function (skypeAccount) {
	console.log('Skyweb ready!');
	skywebReady = true;
	if (skypeQueue.length > 0) {
		for (var i = 0; i < skypeQueue.length; i++) {
			skyweb.sendMessage(skypeQueue[i].id, skypeQueue[i].message);
		}
	}
}).catch(function (e) {
	console.error(e);
});

skyweb.messagesCallback = (messages) => {
    messages.forEach((message) => {
        if (message.resource.from.indexOf(creds.skypeuser) === -1 && message.resource.messagetype !== 'Control/Typing' && message.resource.messagetype !== 'Control/ClearTyping') {
			var conversationLink = message.resource.conversationLink;
            var conversationId = conversationLink.substring(conversationLink.lastIndexOf('/') + 1);
			lastID = conversationId;
			if (discordReady) {
				discordChannel.createMessage("[" + conversationId + "] " + message.resource.content);
			} else {
				discordQueue.push("[" + conversationId + "] " + message.resource.content);
			}
        }
    });
};

discord.on("ready", () => {
	console.log("Discord client ready!");
	discord.getDMChannel(creds.discorduser).then(function (channel) {
		console.log("Discord channel ready!");
		discordChannel = channel;
		discord.on("messageCreate", function (msg) {
			if (msg.channel.id == discordChannel.id && msg.author.id != discord.user.id) {
				var matches = /\s*\[(\S+)\]\s*([\s\S]*)/i.exec(msg.content);
				var message = null;
				if (matches == null) {
					if (lastID == null) {
						console.log(msg.content);
						discordChannel.createMessage("Message failed to send. Ensure you specify channel ID.");
					} else {
						message = msg.content;
					}
				} else {
					lastID = matches[1];
					message = matches[2];
				}
				if (message != null) {
					if (skywebReady) {
						skyweb.sendMessage(lastID, message);
					} else {
						skypeQueue.push({
							id: lastID,
							message: message
						});
					}
				}
			}
		});
		discordReady = true;
		if (discordQueue.length > 0) {
			for (var i = 0; i < discordQueue.length; i++) {
				discordChannel.createMessage(discordQueue[i]);
			}
		}
	}).catch(function (e) {
		console.error(e);
	});
});

discord.on("error", function (e) {
	console.error(e);
});

skyweb.on("error", function (e) {
	console.error(e);
});

discord.connect();
