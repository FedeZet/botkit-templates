const fs = require('fs');
require('dotenv').config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	partials: ['MESSAGE', 'CHANNEL'],
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// When the client receives a message, run this code
client.on('messageCreate', async (message) => {
	const prefix = process.env.PREFIX;

	if (message.author.bot) return;

	if (!message.content.startsWith(prefix)) return;

	let args = message.content.slice(prefix.length).trim().split(/ +/g);

	let command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.reply('Pong!');
	} else if (command === 'say') {
		message.reply(args.join(' '));
	} else if (command === 'server') {
		message.reply(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
		);
	} else if (command === 'user') {
		message.reply(`Your tag: ${message.user.tag}\nYour id: ${message.user.id}`);
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_CLIENT_TOKEN);
