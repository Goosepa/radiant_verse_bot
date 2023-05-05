const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');

module.exports = {
    name: 'help',
    category: 'utils',
    ownerOnly: false,
    usage: 'help <command>',
    examples: ['help emit', 'help'],
    description: 'Affiche les commandes disponibles.',
    permissions: [],
    options: [
        {
        type: ApplicationCommandOptionType.String,
        name: 'commande',
        description: 'La commande que vous souhaitez connaître.',
        required: false
        }
    ],
    run: (client, interaction, args) => {
        const commandName = interaction.options.getString('commande')?.toLowerCase();


        if (!commandName || commandName == 'help') {
            const noArgsEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username} ✦ /help`, iconURL: interaction.user.displayAvatarURL()})
            .setTitle('📑 GUIDE ✦ Liste des commandes disponibles')
            .setDescription("> Pour en savoir plus sur une commande, veuillez fournir la commande que vous souhaitez lors de l'execution de cette commande.\n> \n> Exemple: \`/help ping\`")
            .setColor('#FFFFFF')
            .setFooter({  text: interaction.guild.name , iconURL: interaction.guild.iconURL() })

            for ( const category of commandFolder ) {
                noArgsEmbed.addFields({
                    name: `🌠 ✦ ${category.replace(/(^\w|\s\w)/g, l => l.toUpperCase())}`,
                    value: `${client.commands.filter(command => command.category == category.toLowerCase()).map(command => `\`/${command.name}\``).join(' ✦ ')}`,
                    inline: true
                })
            }

            return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
        } else {

            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) {
                return interaction.reply({ content: 'La commande que vous souhaitez connaître n\'existe pas.', ephemeral: true });
            }

            const commandEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username} ✦ /help ${command.name}`, iconURL: interaction.user.displayAvatarURL()})
            .setTitle(`📑 GUIDE ✦ La commande ${command.name}`)
            .setDescription(`> ${command.description}\n> \n> Exemple(s) : \`/${command.usage}\` ✦ \`/${command.examples.join('\` ✦ `/')}\``)
            .addFields({
                name: 'Réservé au propriétaire',
                value: `${command.ownerOnly == true ? "✅" : "❌"}`,
                inline: true
            },{
                name: 'Permissions',
                value: `${command.permissions.join(' ✦ ')}`,
                inline: true
            })
            .setColor('#FFFFFF')
            .setFooter({  text: interaction.guild.name , iconURL: interaction.guild.iconURL() })

            return interaction.reply({ embeds: [commandEmbed], ephemeral: true });
        }
    }
};