module.exports = {
	name: 'user',
	description: '👤 Reply with the user information.',
	aliases: [],
	async execute(message, args) {
		message.reply(
			`**Your tag:** ${message.member.user.tag}\n**Your id:** ${message.member.user.id}`
		);
	},
};
