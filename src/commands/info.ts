const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../../config.json');
const { covidInfo } = require('../core/covidInfo');

module.exports = {
    slash: true,
    testOnly: false,
    category: 'Fun',
    description: "Shows info about COVID-19 and it's symptoms!",
    callback: async ({}) => {
        const infoEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle('COVID-19 Symptoms and info:')
            .addFields(
                { name: "Source: WHO", value: `${covidInfo}` }
            )
        return infoEmbed;
    }
}