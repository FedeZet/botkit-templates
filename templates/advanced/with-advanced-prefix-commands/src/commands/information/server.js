module.exports = {
	name: 'server',
	description: '🏠 Reply with the server information.',
	aliases: [],
	async execute(message, args) {
		message.reply(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
		);
	},
};
