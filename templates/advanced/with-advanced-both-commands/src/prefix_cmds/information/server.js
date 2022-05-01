module.exports = {
	name: 'server',
	description: '🏠 Reply with the server information.',
	aliases: [],
	async execute(message, args) {
		message.reply(
			`**Server name:** ${message.guild.name}\n**Total members:** ${message.guild.memberCount}`
		);
	},
};
