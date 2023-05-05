const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'utils',
    ownerOnly: false,
    usage: 'ping',
    examples: ['ping'],
    description: 'Une commande permettant d\'afficher la latence du bot.',
    permissions: [],
    run: (client, interaction, args) => {
        interaction.reply('Pong!');
    }
};