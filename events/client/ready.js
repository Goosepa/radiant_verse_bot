const Logger = require('../../utils/Logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        let guildCount = await client.guilds.fetch();
        let userCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        Logger.client(`- Prêt à être utilisé par ${userCount} membres sur ${guildCount.size} serveurs !`);

        client.user.setPresence({
            status: 'idle',
            activity: {
                name: `with Radiant's members !`,
                type: 'LISTENING'
            }
        });

        const devGuild = client.guilds.cache.get(process.env.GUILD_ID);
        devGuild.commands.set(client.commands.map(c => c));
        client.application.commands.set(client.commands.map(c => c));
    }
};