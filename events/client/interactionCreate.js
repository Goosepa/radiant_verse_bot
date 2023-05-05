const Discord = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        let guildSettings = await client.getGuild(interaction.guild);

        if (!guildSettings) {
            await client.createGuild(`${interaction.guildId}`);
            guildSettings = await client.getGuild(interaction.guild);
        }

        if(interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName)
            if (!command) return;

            const missingPermissions = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
            .setTitle('❌ PERMISSIONS ✦ Vous ne pouvez pas utiliser cette commande')
            .setColor('#ff0000')
            .setDescription(`Oups... On dirait que tu n'as pas la droit d'utiliser cette commande.\n\n> Les permissions nécessaires pour utiliser cette commande sont: ${command.permissions.join(', ')}`)
            .setFooter({  text: interaction.guild.name , iconURL: interaction.guild.iconURL() })


            if (!interaction.member.permissions.has([command.permissions])) return interaction.reply({ embeds: [missingPermissions], ephemeral: true });
            command.run(client, interaction, guildSettings)
        } else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);
            if (!button) return;
            button.run(client, interaction, guildSettings);
        } else if (interaction.isSelectMenu()) {
            const selectMenu = client.selects.get(interaction.customId);
            if (!selectMenu) return;
            selectMenu.run(client, interaction, guildSettings);
        }
    }
};