// Require discord module
const Discord = require('discord.js');
const fetch = require('node-fetch');

// Require dotenv module
const dotenv = require('dotenv');

// Config dotenv
dotenv.config();

// create a new Discord client
const client = new Discord.Client();

const baseUrl = 'https://api.henrikdev.xyz';

const getUserPuuid = (name = ' ', tag = 0) => {
  console.log(name, tag);
  return fetch(`${baseUrl}/valorant/v1/puuid/${name}/${tag}`)
    .then((res) => res.json())
    .then((data) => {
      return getUserInfoByPuuid(data.data.puuid, 'na');
    });
};

const getUserInfoByPuuid = (puuid = '', region = 'na') => {
  return fetch(`${baseUrl}/valorant/v1/by-puuid/mmr/${region}/${puuid}`)
    .then((res) => res.json())
    .then((json) => json.data);
};
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
  console.log('Ready');
});

const prefix = '!';
// client.on('message', message => console.log(message.content));

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  // ...
  // Using the new `command` variable, this makes it easier to manage!
  // You can switch your other commands to this format as well
  if (command === 'rank') {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}!
To use the bot use the command: !rank Name #Tag
Example: !rank SnugWalter #1111
Note: Remember use the capitals letters and lower case`
      );
    }

    let name = '';
    let tag = 0;
    if (args.length > 2) {
      const firstPart = args[0];
      const secondPart = args[1];
      name = `${firstPart} ${secondPart}`;
      tag = args[2].substr(1);
    } else {
      name = args[0];
      tag = args[1].substr(1);
    }
    getUserPuuid(name, tag).then((data) => {
      message.channel.send(
        `There is your info ${message.author}
Username: ${name}
Your rank is ${data.currenttierpatched}
Your Elo is: ${data.elo}`
      );
    });
  }
});
// login to Discord with your app's token
client.login(process.env.TOKEN);
