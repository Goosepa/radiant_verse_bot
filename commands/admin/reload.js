const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { Guild } = require('../../models/index')

module.exports = {
    name: 'reload',
    category: 'admin',
    permissions: [PermissionsBitField.Flags.Administrator],
    ownerOnly: false,
    usage: 'reload',
    examples: ['reload'],
    description: 'Cette commande permet de relancer le bot.',
    async run(client, interaction, guildSettings) {
        const logChannel = client.channels.cache.get(guildSettings.logChannel);

        //const devGuild = client.guilds.cache.get(process.env.GUILD_ID);
        //devGuild.commands.set(client.commands.map(c => c));

        await interaction.reply({ content: '✅ Redémarrage en cours... ', ephemeral: true });
        await logChannel.send(`📩 La commande \`/reload\` a été exécutée par le membre ${interaction.user}.`);

        return process.exit();
    },
};