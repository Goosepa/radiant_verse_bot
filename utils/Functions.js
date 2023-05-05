const {Guild} = require('../models');
const Logger = require('../utils/Logger');

module.exports = client => {
    client.getGuild = async guild => {
        const guildData = await Guild.findOne({ guildId: guild.id });
        return guildData;
    };

    client.createGuild = async guild => {
        const createGuild = new Guild({ guildId: guild });
        createGuild.save().then(g => Logger.client(`Guild created ${g.guildId}`));
    };

    client.updateGuild = async (guild, settings) => {
        let guildData = await client.getGuild(guild);
        if (typeof guildData != 'object') guildData = {};
        for (const key in settings) {
            if (guildData[key] != settings[key]) guildData[key] = settings[key];
        }
        return guildData.updateOne(settings).catch(err => Logger.error(err));
    }
}