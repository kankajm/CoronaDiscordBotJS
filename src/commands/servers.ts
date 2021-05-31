const { MessageEmbed } = require('discord.js');
const { embedColor, inviteLink } = require('../../config.json');

module.exports = {
    slash: true,
    testOnly: false,
    description: "Shows number of servers are we on!",
    callback: ({ client }) => {
            const embedServers = new MessageEmbed()
                .setColor(embedColor)
                .setTitle('CoronaBot Servers :desktop:')
                .addFields(
                    { name: 'CoronaBot is already on ' + client.guilds.cache.size + ' servers! :sunglasses:', value: `If you like the bot and you want him on your server, you can add him with this link: ${inviteLink}` }
                )
            return embedServers;
    }
}