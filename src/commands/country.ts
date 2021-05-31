const { MessageEmbed } = require('discord.js');
const { checkIfRightCountry, getDataOfCountry, getVaccinationCountryData } = require('../core/apiRequests');
const { Country } = require('../models/Country');
const { embedColor } = require('../../config.json');
const { formatNumber } = require('../core/numberFormat');

module.exports = {
    slash: true,
    testOnly: false,
    description: 'Shows COVID-19 statistics about desired country!',
    minArgs: 1,
    expectedArgs: '<name>',
    callback: async ({ args }) => {
        const [name] = args;

            const data = await getDataOfCountry(name);
            const wrongCountry = await checkIfRightCountry(data['country']);
            if (wrongCountry === true) {
                const embedWrongCountry = new MessageEmbed()
                    .setColor(embedColor)
                    .addFields(
                        { name: 'ERROR! :no_entry_sign:', value: 'You have written wrong country name or database is unavailable. Try it again.' }
                    )
                    return embedWrongCountry;
            }

            const country_object = new Country(data['country'], data['countryInfo']['iso2'], data['continent'], data['cases'], data['tests'], data['critical'], data['deaths'], data['recovered'], data['active'], data['todayCases'], data['todayDeaths'], data['todayRecovered']);
            let vaccination_numbers: any;
            const fetched_vaccination_data: any = await getVaccinationCountryData(data['country']);
            const country_vaccination: any = fetched_vaccination_data['timeline'];
            if (country_vaccination === null || country_vaccination === undefined) {
                vaccination_numbers = 0
            } else {
                vaccination_numbers = country_vaccination[Object.keys(country_vaccination)[0]];
            };

            const countryEmbed = new MessageEmbed()
                    .setTitle('COVID-19 cases in ' + country_object.get_name + ' ' + country_object.get_flag_emoji)
                    .setColor(embedColor)
                    .addFields(
                        {
                            name: "*Here is your data boss* :sunglasses:", value: `**Total cases:** ${country_object.get_cases}
                                                                       **Total deaths:** ${country_object.get_deaths}
                                                                       **Total recovered:** ${country_object.get_recovered}
                                                                       **Total tests:** ${country_object.get_tests}
                                                                       **Active cases:** ${country_object.get_active_cases}
                                                                       **Critical condition:** ${country_object.get_critical_cases}
                                                                       **Today's cases:** ${country_object.get_today_cases}
                                                                       **Today's deaths:** ${country_object.get_today_deaths}
                                                                       **Today's recovered:** ${country_object.get_today_recovered}
                                                                       **People vaccinated to this day:** ${formatNumber(vaccination_numbers)}`
                        }
                    )

        return countryEmbed;
    },
}