const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Discord.Client();
const perspectiveApiKey = process.env.PERSPECTIVE_API_KEY;
const mainChannelIds = process.env.MAIN_CHANNEL_IDS.split(',');
const moderationChannelId = process.env.MODERATION_CHANNEL_ID;

client.on('message', async (message) => {
  if (message.author.bot || !mainChannelIds.includes(message.channel.id)) return; // Ignore messages from bots and non-specified channels

  const perspectiveUrl = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze';

  // Set up the API request payload
  const data = {
    comment: { text: message.content },
    languages: ['en'],
    requestedAttributes: { TOXICITY: {} },
  };

  // Set up the API request headers
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${perspectiveApiKey}`,
  };

  try {
    // Make the API request
    const response = await axios.post(perspectiveUrl, data, { headers });
    const toxicityScore = response.data.attributeScores.TOXICITY.summaryScore.value;

    // Check if the message is toxic
    if (toxicityScore >= 0.7) {
      // Delete the toxic message
      await message.delete();

      // Send the toxic message to the moderation channel
      const moderationChannel = client.channels.cache.get(moderationChannelId);
      if (moderationChannel) {
        moderationChannel.send(`Toxic message by ${message.author.username} in ${message.channel}:\n${message.content}`);
      }
    }
  } catch (error) {
    console.error('Error checking message:', error.message);
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Replace 'YOUR_DISCORD_BOT_TOKEN' with your actual Discord bot token
client.login(process.env.DISCORD_TOKEN);
