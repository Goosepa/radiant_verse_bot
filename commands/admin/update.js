const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { Guild } = require('../../models/index')

module.exports = {
    name: 'update',
    category: 'admin',
    permissions: [PermissionsBitField.Flags.Administrator],
    ownerOnly: false,
    usage: 'update',
    examples: ['emit guildMemberAdd', 'emit guildMemberRemove'],
    description: 'Cette commande permet de mettre à jour la base de données.',
    async run(client, interaction, guildSettings) {
        const logChannel = client.channels.cache.get(guildSettings.logChannel);

        //await Guild.updateMany({}, { "$set": { "": "" }, upsert: true });

        interaction.reply({ content: "✅ Les données ont été mises à jour.", ephemeral: true });

        return logChannel.send(`📩 La commande \`/update\` a été exécutée par le membre ${interaction.user}.`);
    },
};