const fs = require('fs');
require('dotenv').config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS],
	partials: ['MESSAGE'],
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// When the client receives an interaction, run this code
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(
			`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
		);
	} else if (commandName === 'user') {
		await interaction.reply(
			`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
		);
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_CLIENT_TOKEN);
