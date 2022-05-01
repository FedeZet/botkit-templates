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

// Commands
client.commands = new Collection();
console.log('📚 Commands List');
const folder = fs.readdirSync('./src/commands/');
for (const module of folder) {
	const commandFiles = fs
		.readdirSync(`./src/commands/${module}`)
		.filter((file) => file.endsWith('.js'));

	console.log(`🧮 Category: ${module}`);
	for (const file of commandFiles) {
		const command = require(`./commands/${module}/${file}`);

		client.commands.set(command.name, command);

		console.log(`📖 ${command.name} | ${command.description}`);
	}
	console.log('');
}

// Login to Discord with your client's token
client.login(process.env.DISCORD_CLIENT_TOKEN);
