const { MessageEmbed } = require('discord.js');
const { embedColor, inviteLink } = require('../../config.json');
const { formatNumber } = require('../core/numberFormat');

module.exports = {
    slash: true,
    testOnly: false,
    description: 'Invite this bot on your server!',
    callback: ({}) => {
        const inviteEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle('CoronaBot Invite link :star_struck:')
            .addFields(
                { name: "*If you like CoronaBot you can add him on your server!*  :sunglasses:", value: `Here's your invite link: ${inviteLink}` }
            );
        return inviteEmbed;
    }
}