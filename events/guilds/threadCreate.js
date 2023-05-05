const Logger = require('../../utils/Logger');

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        Logger.client(`${member.user.tag} has joined the thread!`);
    }
}