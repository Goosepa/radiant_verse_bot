const { Client , Collection, Partials } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose');
const client = new Client({ intents: 3243773, partials: [Partials.Message, Partials.Channel, Partials.Reaction]});
const Logger = require('./utils/Logger');

['commands', 'buttons', 'selects'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'SelectUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client); });
require('./utils/Functions')(client);

process.on('exist', (code) => {
    Logger.client(`Process exited with code ${code}`);
});
process.on('uncaughtException', (err, origin) => {
    Logger.error(`Uncaught exception: ${err}, origin: ${origin}`);
});
process.on('unhandledRejection', (reason, promise) => {
    Logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});
process.on('warning', (warning) => {Logger.warn(warning)});

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4, 
}).then(() => { Logger.client('Connected to MongoDB'); }).catch((err) => { Logger.warn(err) });

client.login(process.env.DISCORD_TOKEN);