const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
    slash: true,
    testOnly: false,
    category: 'Misc',
    description: "Shows authors of the bot!",
    callback: async ({}) => {
        const embedAuthors = new MessageEmbed()
            .setColor(embedColor)
            .setTitle('Authors of CoronaBot :tools:')
            .setDescription('*People who programmed or helped made CoronaBot better!*')
            .addFields(
                { name: 'Creator and main programmer:', value: "Jaroslav Kaňka (kankaj#2731) :flag_cz:" },
                { name: 'Bug hunter:', value: "Rayan Yessou (.[R4y]#2049) :flag_it:" },
                { name: 'Bot tester:', value: "Ondřej Štěch (Spike#5530) :flag_cz:" },
                { name: 'CoronaBot Logo:', value: "Tadeáš Poplužník (Tágo#6598) :flag_cz:" }
            )
            .setFooter('In case of any problem please contact me (kanka@kankaj.cz or kankaj#2731)', 'https://ourghtfu.sirv.com/Images/czechIcon.png');
        return embedAuthors;
    }
}