const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
    slash: true,
    testOnly: false,
    category: 'Misc',
    description: "If you want to support bot financially.",
    callback: async ({}) => {
        const donationEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle('CoronaBot Donation:')
            .addFields(
                { name: "If you want to support our development and server cost you can use this donation link. Thank you very much if you do <3", value: "https://ko-fi.com/kankaj" }
            )
        return donationEmbed;
    }
}