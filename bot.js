const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.includes('lemon')) {
        msg.delete()
            .then(deletedMsg => console.log(`Deleted message from ${deletedMsg.author.username}`))
            .catch(error => console.error('Could not delete message due to:', error));
    }
});

client.login('MTE5NTkwMTg2MjUzNzM0MzA2Nw.GhFeX1.AefYRGuXSbhADsX_QoDUozi8Hdsd5MGBoHIXY4');
