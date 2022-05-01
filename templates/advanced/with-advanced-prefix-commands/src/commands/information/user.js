module.exports = {
	name: 'user',
	description: '👤 Reply with the user information.',
	aliases: [],
	async execute(message, args) {
		message.reply(`Your tag: ${message.user.tag}\nYour id: ${message.user.id}`);
	},
};
