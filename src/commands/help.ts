const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
    slash: true,
    testOnly: false,
    category: 'Help',
    description: "All the important commands for the bot!",
    callback: async ({ }) => {
        const embedHelp = new MessageEmbed()
            .setColor(embedColor)
            .setTitle('Commands for CoronaBot:')
            .addFields(
                { name: 'Shows COVID-19 statistics about the whole world:', value: '/world', inline: false },
                { name: 'Shows COVID-19 statistics about desired country:', value: '/country <name>', inline: false },
                { name: "Shows info about COVID-19 and it's symptoms:", value: '/info', inline: false },
                { name: 'Shows link to invite bot on your server:', value: '/invite', inline: false },
                { name: 'Shows number of servers we are on:', value: '/servers', inline: false },
                { name: 'Shows debug info:', value: '/debug', inline: false },
                { name: 'Shows authors of the bot:', value: '/authors', inline: false },
                { name: 'If you want to support bot financially:', value: '/donate', inline: false }
            )
            .setFooter('In case of any problem please contact me (kanka@kankaj.cz or kankaj#2731)', 'https://ourghtfu.sirv.com/Images/czechIcon.png');
        return embedHelp;
    }
}