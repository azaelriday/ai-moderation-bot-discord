const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

client.on('message', message => {
  if (message.content.includes('lemon')) {
    message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author.username} containing the word "lemon"`))
      .catch(console.error);
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN); // Your Discord Bot Token
