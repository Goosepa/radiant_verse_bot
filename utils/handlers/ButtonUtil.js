const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');

module.exports = async client => {
    (await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async btnFile => {
        const button = require(btnFile);

        if (!button.name) return Logger.typo(`BOUTTON NON CHARGÉE: Button ${btnFile} is missing a name`);

        client.buttons.set(button.name, button);
    });
};