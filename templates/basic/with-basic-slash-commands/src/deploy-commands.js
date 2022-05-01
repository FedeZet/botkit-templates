const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

// Information of the slash commands that will be displayed to Discord
const commands = [
	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('🏓 Replies with pong!'),
	new SlashCommandBuilder()
		.setName('server')
		.setDescription('🏠 Replies with server info!'),
	new SlashCommandBuilder()
		.setName('user')
		.setDescription('👤 Replies with user info!'),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(
	process.env.DISCORD_CLIENT_TOKEN
);

rest
	.put(
		Routes.applicationGuildCommands(
			process.env.DISCORD_CLIENT_ID,
			process.env.DISCORD_GUILD_ID
		),
		{ body: commands }
	)
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
