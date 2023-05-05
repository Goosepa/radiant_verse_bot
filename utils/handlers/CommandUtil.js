const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');

const { ApplicationCommandType } = require('discord.js')

module.exports = async client => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async cmdFile => {
        const cmd = require(cmdFile);

        if (!cmd.name) return Logger.typo(`COMMANDE NON CHARGÉE: Command ${cmdFile} is missing a name`);

        if (!cmd.description && cmd.type != ApplicationCommandType.User) return Logger.typo(`COMMANDE NON CHARGÉE: Command ${cmdFile} is missing a description`);

        if (!cmd.permissions) return Logger.warn(`COMMANDE NON CHARGÉE: Command ${cmdFile} is missing permissions`);

        if (!cmd.category) return Logger.warn(`COMMANDE NON CHARGÉE: Command ${cmdFile} is missing a category`);

        if (!cmd.ownerOnly == undefined) return Logger.warn(`COMMANDE NON CHARGÉE: Command ${cmdFile} is missing ownerOnly information`);

        if (!cmd.usage) return Logger.warn(`COMMANDE NON CHARGÉE: Command ${cmdFile} is missing usage information`);

        if (!cmd.examples) return Logger.warn(`COMMANDE NON CHARGÉE: Command ${cmdFile} is missing examples`);

        client.commands.set(cmd.name, cmd);
        Logger.command(`COMMANDE CHARGÉE: ${cmd.name}`);
    });
};