module.exports = {
	name: 'ping',
	description: '🏓 Reply with pong!',
	aliases: ['p'],
	async execute(message, args) {
		message.reply(':ping_pong: `' + message.client.ws.ping + ' ms.');
	},
};
