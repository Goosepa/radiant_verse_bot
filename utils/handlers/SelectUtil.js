const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');

module.exports = async client => {
    (await pGlob(`${process.cwd()}/selects/*/*.js`)).map(async selectMenuFile => {
        const selectMenu = require(selectMenuFile);

        if (!selectMenu.name) return Logger.typo(`SELECT MENU CHARGÉE: selectMenu ${selectMenuFile} is missing a name`);

        client.selects.set(selectMenu.name, selectMenu);
    });
};