const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildId: String,
    logChannel: { 'type': String, 'default': null}
});

module.exports = mongoose.model('Guild', guildSchema);