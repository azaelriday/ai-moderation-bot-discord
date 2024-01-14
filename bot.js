require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.content.includes('lemon')) {
        message.delete()
            .then(msg => console.log(`Deleted message from ${msg.author.username} containing the word 'lemon'`))
            .catch(console.error);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
