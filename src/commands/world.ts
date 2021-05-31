const { MessageEmbed } = require('discord.js');
const { getDataOfWorld } = require('../core/apiRequests');
const { World } = require('../models/World');
const { embedColor } = require('../../config.json');
const { formatNumber } = require('../core/numberFormat');

module.exports = {
    slash: true,
    testOnly: false,
    description: 'Shows COVID-19 statistics about the whole world!',
    callback: async ({}) => {
        const data = await getDataOfWorld();
            const world_object = new World(data['cases'], data['deaths'], data['recovered'], data['tests'], data['active'], data['critical'], data['todayCases'], data['todayDeaths'], data['todayRecovered'], data['affectedCountries']);
            const worldEmbed = new MessageEmbed()
                .setColor(embedColor)
                .setTitle('COVID-19 World cases :united_nations:')
                .addFields(
                    {
                        name: "*Here is your data boss* :sunglasses:", value: `**Total cases:** ${world_object.get_cases}
                                                                     **Total deaths:** ${world_object.get_deaths}
                                                                     **Total recovered:** ${world_object.get_recovered}
                                                                     **Total tests:** ${world_object.get_tests}
                                                                     **Active cases:** ${world_object.get_active}
                                                                     **Critical cases:** ${world_object.get_critical}
                                                                     **Today's cases:** ${world_object.get_today_cases}
                                                                     **Today's deaths:** ${world_object.get_today_deaths}
                                                                     **Today's recovered:** ${world_object.get_today_recovered}
                                                                     **Affected countries:** ${world_object.get_affected_countries}`
                    }
                )
            return worldEmbed;
    },
}