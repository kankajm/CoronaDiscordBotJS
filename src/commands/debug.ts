const { MessageEmbed } = require('discord.js');
const { APIStatusCode } = require('../core/apiRequests');
const { prefix, version, embedColor, lastUpdate } = require('../../config.json');
const { systemName, nodeVersion } = require('../core/systemInfo');

function apiStatusFormatter(statusCode: number) {
    if (statusCode === 200) {
        return 'API works properly :thumbsup:'
    } else {
        return 'API does not work :sob:'
    }
}

module.exports = {
    slash: true,
    testOnly: false,
    category: 'Misc',
    description: "Debug informations.",
    callback: async ({}) => {
        const apiStatusFormatted: string = apiStatusFormatter(await APIStatusCode());
        const debugEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle('CoronaBot debug informations :nerd:')
            .addFields(
                { name: "CoronaAPI status:", value: `${apiStatusFormatted}` },
                { name: 'Bot version:', value: version },
                { name: 'Node.JS version:', value: nodeVersion },
                { name: 'OS name:', value: systemName },
                { name: 'Last update:', value: lastUpdate },
                { name: 'GitHub repository:', value: 'https://github.com/kankajm/CoronaDiscordBotJS' }
            )
        return debugEmbed;
    }
}