const fs = require('fs');
require('dotenv').config();

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	partials: ['MESSAGE', 'CHANNEL'],
});

// Events
console.log('📚 Events list');
const eventFiles = fs
	.readdirSync('./src/events')
	.filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}

	console.log(`💾 Loaded event: ${event.name}`);
}
console.log('');

// Slash Commands
client.slashCmds = new Collection();
console.log('📚 Slash Commands List (/)');
const folderSlashCmds = fs.readdirSync('./src/slash_cmds/');
for (const module of folderSlashCmds) {
	const commandFiles = fs
		.readdirSync(`./src/slash_cmds/${module}`)
		.filter((file) => file.endsWith('.js'));

	console.log(`🧮 Category: ${module}`);
	for (const file of commandFiles) {
		const command = require(`./slash_cmds/${module}/${file}`);

		client.slashCmds.set(command.data.name, command);

		console.log(`📖 ${command.data.name} | ${command.data.description}`);
	}
	console.log('');
}

// Prefix Commands
client.prefixCmds = new Collection();
console.log(`📚 Prefix Commands List (${process.env.PREFIX})`);
const folderPrefixCmds = fs.readdirSync('./src/prefix_cmds/');
for (const module of folderPrefixCmds) {
	const commandFiles = fs
		.readdirSync(`./src/prefix_cmds/${module}`)
		.filter((file) => file.endsWith('.js'));

	console.log(`🧮 Category: ${module}`);
	for (const file of commandFiles) {
		const command = require(`./prefix_cmds/${module}/${file}`);

		client.prefixCmds.set(command.name, command);

		console.log(`📖 ${command.name} | ${command.description}`);
	}
	console.log('');
}

// Login to Discord with your client's token
client.login(process.env.DISCORD_CLIENT_TOKEN);
