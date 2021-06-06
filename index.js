// Require discord module
const Discord = require('discord.js');


// Require dotenv module
const dotenv = require('dotenv');

// Config dotenv
dotenv.config();

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => console.log('Ready!'));

// client.on('message', message => console.log(message.content));

client.on('message', message => {
	if (message.content === '!user') {
		// send back "Pong." to the channel the message was sent in
        const username = message.author.username;
		message.channel.send(username);
	}
});
// login to Discord with your app's token
client.login(process.env.TOKEN);
