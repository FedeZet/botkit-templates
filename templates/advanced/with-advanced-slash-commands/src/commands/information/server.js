const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('🏠 Reply with the server information.'),
	async execute(interaction) {
		await interaction.reply(
			`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
		);
	},
};
