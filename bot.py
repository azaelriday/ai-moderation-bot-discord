import discord
from discord.ext import commands
import requests

# Perspective API key (replace with your own key)
PERSPECTIVE_API_KEY = 'YOUR_PERSPECTIVE_API_KEY'

# Create an instance of the bot
bot = commands.Bot(command_prefix='!')

# Define a command to check a message using the Perspective API
@bot.event
async def on_message(message):
    if message.author == bot.user:
        return  # Ignore messages from the bot itself

    perspective_url = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze'

    # Set up the API request payload
    data = {
        'comment': {'text': message.content},
        'languages': ['en'],
        'requestedAttributes': {'TOXICITY': {}},
    }

    # Set up the API request headers
    headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {PERSPECTIVE_API_KEY}'}

    # Make the API request
    response = requests.post(perspective_url, json=data, headers=headers)
    result = response.json()

    # Check if the message is toxic
    toxicity_score = result['attributeScores']['TOXICITY']['summaryScore']['value']
    if toxicity_score >= 0.7:
        await message.delete()
        await message.channel.send(f'Message by {message.author.display_name} deleted due to toxicity.')

    await bot.process_commands(message)

# Event to print a message when the bot is ready
@bot.event
async def on_ready():
    print(f'{bot.user} has connected to Discord!')

# Run the bot with the token
bot.run('YOUR_BOT_TOKEN')
