const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'dbconfig',
    category: 'admin',
    permissions: [PermissionsBitField.Flags.Administrator],
    ownerOnly: false,
    usage: 'dbconfig <value>',
    examples: ['dbconfig logChannel'],
    description: 'Configurer une variable dans le serveur.',
    options: [
        {
            name: 'key',
            description: 'Choisir une clé à modifier.',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'logChannel',
                    value:'logChannel',
                }
            ]
        },
        {
            name: 'value',
            description: 'Choisir la nouvelle valeur pour votre clé.',
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    async run(client, interaction) {
        const key = interaction.options.getString('key');
        const value = interaction.options.getString('value');
        const logChannel = await client.channels.cache.get(value);

        if (key == 'logChannel') {
            if (value) {
                if (logChannel == undefined) return interaction.reply({ content: `❌ Ce salon n'existe pas.`, ephemeral: true });
                await client.updateGuild(interaction.guild, { logChannel: value });

                logChannel.send(`📩 La commande \`/dbconfig ${key} ${value}\` a été exécutée par le membre ${interaction.user}.`);
                return interaction.reply({ content: `✅ Le logChannel a été mis à jour: ${value}.`, ephemeral: true });
            }
            return interaction.reply({ content: `✅ LogChannel actuel : ${value}.`, ephemeral: true });
        }
    }
};