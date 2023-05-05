const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'emit',
    category: 'admin',
    permissions: [PermissionsBitField.Flags.Administrator],
    ownerOnly: false,
    usage: 'emit <event>',
    examples: ['emit guildMemberAdd', 'emit guildMemberRemove'],
    description: 'Emettre un événement.',
    options: [
        {
            name: 'event',
            description: 'Nom de l\'événement.',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value:'guildMemberAdd'
                },
                {
                    name: 'guildMemberRemove',
                    value:'guildMemberRemove'
                },
                {
                    name: 'guildCreate',
                    value:'guildCreate'
                }
            ]
        }
    ],
    run: (client, interaction, guildSettings) => {
        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        const eventChoices = interaction.options.getString('event');

        if (eventChoices == 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({ content: 'Un membre a été ajouté.', ephemeral: true });
        } else if (eventChoices == 'guildMemberRemove') {
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({ content: 'Un membre a été retiré.', ephemeral: true });
        } else if (eventChoices == 'guildCreate') {
            client.emit('guildCreate', interaction.guild);
            interaction.reply({ content: 'Le serveur a été créé.', ephemeral: true });
        }

        return logChannel.send(`📩 La commande \`/emit ${eventChoices}\` a été exécutée par le membre ${interaction.user}.`);
    }
};