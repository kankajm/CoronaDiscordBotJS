"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { prefix, version, inviteLink, embedColor, coronaLogo, lastUpdate } = require('../config.json');
const dotenv = require('dotenv');
dotenv.config();
const { systemName, nodeVersion } = require('./core/systemInfo');
const { getDataOfCountry, checkIfRightCountry, getDataOfWorld, APIStatusCode, getVaccinationCountryData } = require('./core/apiRequests');
const { initializeBot } = require('./core/initialize');
const { richPresence } = require('./core/rpc');
const { covidInfo } = require('./core/covidInfo');
const { formatNumber } = require('./core/numberFormat');
const Discord = require('discord.js');
const client = new Discord.Client();
const Country_1 = require("./models/Country");
const World_1 = require("./models/World");
// Clears console on start
console.clear();
client.once('ready', () => {
    // core/initialize.ts
    initializeBot(version, systemName, nodeVersion, client.user.username, client.user.id);
});
// Print Rich Presence (changes every 8sec).
client.on('ready', () => {
    setInterval(() => {
        client.user.setActivity(richPresence(client.guilds.cache.size), { type: 'PLAYING' });
    }, 8000);
});
function apiStatusFormatter(statusCode) {
    if (statusCode === 200) {
        return 'API works properly :thumbsup:';
    }
    else {
        return 'API does not work :sob:';
    }
}
// Listens to Admin commands requested by Developers.
client.on('message', async (message) => {
    const botAdminPrefix = ".coronadev";
    const messageAuthor = message.author.id;
    const args = message.content.slice(botAdminPrefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(botAdminPrefix) || message.author.bot)
        return;
    // allows only if users are kankaj or R4Y.
    if (messageAuthor === "161071543584030720" || messageAuthor === "432250055949549579") {
        // Restart command. (PM2)
        if (command === 'restart') {
            console.log(`RESTART BY ${message.author.username}`); // Log it locally
            process.exit();
        }
    }
});
// Listens to all users.
client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot || message.content.startsWith('.coronadev'))
        return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    /*
        // If there is more than one parameter it compares two countries.
        if (args[0] !== undefined) {
            const countryNameFirst: string = args[0];
            const countryNameSecond: string = args[-1];
    
            const dataOne: any = await getDataOfCountry(countryNameFirst);
            const dataSecond: any = await getDataOfCountry(countryNameSecond);
    
            //const firstCountry: Country = new Country(dataOne['country'], dataOne['countryInfo']['iso2'], dataOne['continent'], dataOne['cases'], dataOne['tests'], dataOne['critical'], dataOne['deaths'], dataOne['recovered'], dataOne['active'], dataOne['todayCases'], dataOne['todayDeaths'], dataOne['todayRecovered']);
            //const secondCountry: Country = new Country(dataSecond['country'], dataSecond['countryInfo']['iso2'], dataSecond['continent'], dataSecond['cases'], dataSecond['tests'], dataSecond['critical'], dataSecond['deaths'], dataSecond['recovered'], dataSecond['active'], dataSecond['todayCases'], dataSecond['todayDeaths'], dataSecond['todayRecovered']);
    
            console.log(dataOne);
            console.log(dataSecond);
        }
    */
    switch (command) {
        case 'servers': {
            const authorAvatarURL = message.author.avatarURL();
            const embedServers = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('CoronaBot Servers :desktop:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields({ name: 'CoronaBot is already on ' + client.guilds.cache.size + ' servers! :sunglasses:', value: `If you like the bot and you want him on your server, you can add him with this link: ${inviteLink}` })
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(embedServers);
        }
        case 'version': {
            const authorAvatarURL = message.author.avatarURL();
            const embedVersion = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setAuthor('CoronaBot', coronaLogo)
                .addFields({ name: 'Bot version:', value: version }, { name: 'Node.JS version:', value: nodeVersion }, { name: 'Last update:', value: lastUpdate }, { name: 'GitHub repository:', value: 'https://github.com/kankajm/CoronaDiscordBotJS' })
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(embedVersion);
        }
        case 'ping': {
            const ping = Date.now() - message.createdTimestamp + " ms";
            const authorAvatarURL = message.author.avatarURL();
            const apiStatusCode = await APIStatusCode();
            const apiStatusFormatted = apiStatusFormatter(apiStatusCode);
            const embedPing = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('Bot performance test:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields({ name: 'Bot ping:', value: ping }, { name: 'CoronaAPI status:', value: apiStatusFormatted })
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(embedPing);
        }
        case 'authors': {
            const embedAuthors = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('Authors of CoronaBot :tools:')
                .setAuthor('CoronaBot', coronaLogo)
                .setDescription('*People who programmed or helped make CoronaBot better!*')
                .addFields({ name: 'Creator and main programmer:', value: "Jaroslav Kaňka (kankaj#2731) :flag_cz:" }, { name: 'Bug hunter and programmer:', value: "Rayan Yessou (.[R4y]#3430) :flag_it:" }, { name: 'Bot tester:', value: "Ondřej Štěch (Spike#5530) :flag_cz:" }, { name: 'CoronaBot Logo:', value: "Tadeáš Poplužník (Tágo#4220) :flag_cz:" })
                .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#2731)', 'https://ourghtfu.sirv.com/Images/czechIcon.png');
            return message.channel.send(embedAuthors);
        }
        case 'invite': {
            const authorAvatarURL = message.author.avatarURL();
            const inviteEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('CoronaBot Invite link :star_struck:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields({ name: "*If you like CoronaBot you can add him on your server!*  :sunglasses:", value: `Here's your invite link: ${inviteLink}` })
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(inviteEmbed);
        }
        case 'pes': {
            const authorAvatarURL = message.author.avatarURL();
            const pesEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('PES (Protiepidemický systém ČR), (Anti-epidemic system)')
                .setAuthor('CoronaBot', coronaLogo)
                .setThumbnail('https://ourghtfu.sirv.com/Images/pesDogs/pes-dead.png')
                .addFields({ name: 'CZ: Díky neschopnosti Vlády ČR byl odvolán ministr zdravotnictví:', value: 'Nový ministr zdravotnictví Petr Arenberger (Bývalý člen KSČ, podporovatel Sputniku V a patolízač prezidenta Zemana) ve svém projevu zmínil tvorbu nového protiepidemického systému. Na starý PES máme prý zapomenout.' }, { name: 'Více informací o neschopném MZČR můžete nalézt na stránkách:', value: 'https://www.mzcr.cz/' }, { name: 'EN: Due to the incompetence of the Government of the Czech Republic, the Minister of Health was dismissed:', value: 'The new Minister of Health Petr Arenberger (former member of the Communist Party, supporter of Sputnik V and heel licker of President Zeman) mentioned the creation of a new anti-epidemic system in his speech. We are supposed to forget about the old PES.' }, { name: 'More information about the incompetent Ministry of Health can be found at:', value: 'https://www.mzcr.cz/' }, { name: 'Článek mluvící o tomto tématu:', value: 'https://www.irozhlas.cz/zpravy-domov/petr-arenberger-epidemie-koronavirus-covid_2104091323_tzr' })
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(pesEmbed);
            /*
            const pesNumber: number = await scrapePESNumber();
            const data = await getPESData(pesNumber);

            const thumbnail: string = data.PESEmotion;
            const authorAvatarURL = message.author.avatarURL();
            const inviteEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('PES (Protiepidemický systém ČR)')
                .setAuthor('CoronaBot', coronaLogo)
                .setThumbnail(`${thumbnail}`)
                .addFields(
                    { name: 'Aktuální stupeň pohotovosti:', value: `${data.description}` },
                    { name: 'Co to znamená?', value: `${data.meaning}` },
                    { name: 'Více informací můžete nalézt na stránkách MZČR:', value: 'https://onemocneni-aktualne.mzcr.cz/pes' }
                )
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(inviteEmbed);
            */
        }
        case 'info': {
            const authorAvatarURL = message.author.avatarURL();
            const infoEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('COVID-19 Symptoms and info:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields({ name: "Source: WHO", value: `${covidInfo}` })
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(infoEmbed);
        }
        case 'help': {
            const embedHelp = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('Commands for the CoronaBot:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields({ name: 'To show total numbers from countries all around the world use:', value: '.corona world', inline: true }, { name: 'To show info and numbers about specific country use:', value: '.corona <country>', inline: true }, { name: 'To show verified informations about symptoms of the COVID-19:', value: '.corona info', inline: true }, { name: 'To show version of the bot use:', value: '.corona version', inline: true }, { name: 'To show overall performance of the bot use:', value: '.corona ping', inline: true }, { name: 'To invite this bot on your server use:', value: '.corona invite', inline: true }, { name: 'To show on how many servers CoronaBot is:', value: '.corona servers', inline: true }, { name: 'To show authors of the CoronaBot:', value: '.corona authors', inline: true }, { name: 'CZ ONLY: Zobrazí aktuální skóre systému PES', value: '.corona pes', inline: true })
                .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#2731)', 'https://ourghtfu.sirv.com/Images/czechIcon.png');
            return message.channel.send(embedHelp);
        }
        case 'world': {
            const data = await getDataOfWorld();
            const world_object = new World_1.World(data['cases'], data['deaths'], data['recovered'], data['tests'], data['active'], data['critical'], data['todayCases'], data['todayDeaths'], data['todayRecovered'], data['affectedCountries']);
            const authorAvatarURL = message.author.avatarURL();
            const worldEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('COVID-19 World cases:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields({
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
            })
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(worldEmbed);
        }
        default: {
            let countryName = message.content.slice(prefix.length).trimLeft();
            const data = await getDataOfCountry(countryName);
            const wrongCountry = await checkIfRightCountry(data['country']);
            if (wrongCountry === true) {
                const embedWrongCountry = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .addFields({ name: 'ERROR! :no_entry_sign:', value: 'You have written wrong country name or database is unavailable. Try it again.' });
                return message.channel.send(embedWrongCountry);
            }
            else {
                const country_object = new Country_1.Country(data['country'], data['countryInfo']['iso2'], data['continent'], data['cases'], data['tests'], data['critical'], data['deaths'], data['recovered'], data['active'], data['todayCases'], data['todayDeaths'], data['todayRecovered']);
                let vaccination_numbers;
                const fetched_vaccination_data = await getVaccinationCountryData(data['country']);
                const country_vaccination = fetched_vaccination_data['timeline'];
                if (country_vaccination === null || country_vaccination === undefined) {
                    vaccination_numbers = 0;
                }
                else {
                    vaccination_numbers = country_vaccination[Object.keys(country_vaccination)[0]];
                }
                ;
                const authorAvatarURL = message.author.avatarURL();
                const countryEmbed = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('COVID-19 cases in ' + country_object.get_name + ' ' + country_object.get_flag_emoji)
                    .setAuthor('CoronaBot', coronaLogo)
                    .addFields({
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
                })
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
                return message.channel.send(countryEmbed);
            }
        }
    }
});
client.login(process.env.DISCORD_TOKEN);
