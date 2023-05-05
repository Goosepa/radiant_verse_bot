module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (message.author.bot) return;

        let guildSettings = await client.getGuild(message.guild.id);

        if (!guildSettings) {
            await client.createGuild(message.guild.id);
            guildSettings = await client.getGuild(message.guild.id);
        }
    },
};