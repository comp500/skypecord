# skypecord

Skype to Discord bridge, made with node.js.

## Setup
1. Install [node.js and npm](https://nodejs.org/en/).
2. Create a discord bot at https://discordapp.com/developers/applications/me and create a Bot User.
3. Go to https://discordapp.com/oauth2/authorize?client_id=[CLIENT_ID]&scope=bot&permissions=0 where [CLIENT_ID] is your discord bot's client ID, and add your bot to any server that you own.
4. Enable developer mode in discord, by going to User Settings -> Appearance -> Developer Mode
5. Right click your username in the user list of a server, and click Copy ID.

6. Create a file called creds.json in the directory above where you cloned this repo.
Put this in it, replacing the appropriate fields with your skype username, password, discord bot user token and your user ID you copied earlier.

```javascript
{
	"skypeuser": "skype username",
	"skypepass": "skype password",
	"discordtoken": "discord bot user token",
	"discorduser": "discord user id"
}
```

7. Run `npm install` in the directory of your bot, and let it install the required dependencies
8. Run the bot with `node index.js`

## Usage
Get someone to send a message to you. It should get sent to discord, in the following format: "[conversation ID] hi".

When you reply, it will (by default) send the reply to the person who last messaged you, unless the bot was only just started.

If you want to change this, put the conversation ID in brackets before your message, in the same format that the bot sends messages to you. Once you have changed this, it will be the default for future messages unless you send a message or get a message from someone else.

The easiest way to get the conversation ID is for someone to message you from that conversation. For direct messages, the conversation ID is 8:username where username is the skype username of who you want to message.

## Future features
- [ ] Aliases for conversation IDs
- [ ] Contact/recents listing command