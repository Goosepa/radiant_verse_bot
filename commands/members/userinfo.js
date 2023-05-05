const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    category: 'members',
    ownerOnly: false,
    usage: 'userinfo [@user]',
    examples: [],
    permissions: ['userinfo [@user]'],
    type: ApplicationCommandType.User,
    async run(client, interaction, args) {
        const member = await interaction.guild.members.fetch(interaction.targetId);
        

    }
};