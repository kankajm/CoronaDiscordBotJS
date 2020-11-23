const Discord = require('discord.js');
const client = new Discord.Client();
const os = require('os');
const { prefix, token, version, inviteLink, embedColor, coronaLogo, lastUpdate } = require('../config.json');
const apireq = require('./apireq');
const dFormat = require('./data_formatting');

import { Country } from './models/Country';
import { World } from './models/World';

const systemName = os.type();
const nodeVersion = process.version;

// Clears console on start
console.clear();

client.once('ready', async () => {
    // Prints basic info about server and status
    console.log(`Bot is online! Bot version: ${version}`);
    console.log(`Server is running on ${systemName}, Node.js version: ${nodeVersion}`);
    console.log(`Name: ${client.user.username}`);
    console.log(`ID: ${client.user.id}`);
    // Checks if APIs works. If not stop bot.
    const apiStatus = await apireq.getAPIStatus();
    if (apiStatus === "API DOWN!") {
        console.log('API DOES NOT WORK.');
        process.exit();
    } else {
        console.log('API works so bot can serve requests now.');
    }
});

// Print Rich Presence (changes every 8sec).
client.on('ready', () => {
    setInterval(() => {
        client.user.setActivity(dFormat.getOneRPC(client.guilds.cache.size), { type: 'PLAYING' })
    }, 8000);
});

// Listens to Admin commands requested by Developers.
client.on('message', async message => {
    const botAdminPrefix = ".coronadev";
    let messageAuthor = message.author.id;

    const args = message.content.slice(botAdminPrefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(botAdminPrefix) || message.author.bot) return;
    // allows only if users are kankaj or R4Y.
    if (messageAuthor === "161071543584030720" || messageAuthor === "432250055949549579") {
        // Restart command. (PM2)
        if (command === 'restart') {
            console.log(`RESTART BY ${message.author.username}`);
            process.exit();
        }
    }
});

// Listens to all users.
client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot || message.content.startsWith('.coronadev')) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    apireq.sendActivity(message.author.id, message.author.username, message.author.discriminator, command);

    switch (command) {
        case 'version': {
            const authorAvatarURL = message.author.avatarURL();
            const embedVersion = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setAuthor('CoronaBot', coronaLogo)
                .addFields(
                    { name: 'Bot version:', value: version },
                    { name: 'Node.JS version:', value: nodeVersion },
                    { name: 'Last update:', value: lastUpdate },
                    { name: 'GitHub repository:', value: 'https://github.com/kankajm/CoronaDiscordBotJS' },
                )
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(embedVersion);
        }
        case 'servers': {
            const authorAvatarURL = message.author.avatarURL();
            const embedServers = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('CoronaBot Servers :desktop:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields(
                    { name: 'CoronaBot is already on ' + client.guilds.cache.size + ' servers! :sunglasses:', value: `If you like the bot and you want him on your server, you can add him with this link: ${inviteLink}` }
                )
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(embedServers);
        }
        case 'ping': {
            const ping = Date.now() - message.createdTimestamp + " ms";
            const authorAvatarURL = message.author.avatarURL();
            const embedPing = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('Bot performance test:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields(
                    { name: 'Bot ping:', value: ping },
                    { name: 'CoronaAPI status:', value: await apireq.getAPIStatus() }
                )
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
                .addFields(
                    { name: 'Creator and main programmer:', value: "Jaroslav Kaňka (kankaj#1973) :flag_cz:" },
                    { name: 'Bug hunter and programmer:', value: "Rayan Yessou (.[R4y]#3430) :flag_it:" },
                    { name: 'Bot tester:', value: "Ondřej Štěch (Spike#5530) :flag_cz:" }
                )
                .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#1973)', 'https://jkanka.cz/ikonka.png');
            return message.channel.send(embedAuthors);
        }
        case 'invite': {
            const authorAvatarURL = message.author.avatarURL();
            const inviteEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('CoronaBot Invite link :star_struck:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields(
                    { name: "*If you like CoronaBot you can add him on your server!*  :sunglasses:", value: `Here's your invite link: ${inviteLink}` }
                )
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(inviteEmbed);
        }
        case 'pes': {
            const data = await apireq.getPESData();
            const thumbnail: string = data['pesEmotion'];
            const authorAvatarURL = message.author.avatarURL();
            const inviteEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('PES (Protiepidemický systém ČR)')
                .setAuthor('CoronaBot', coronaLogo)
                .setThumbnail(`${thumbnail}`)
                .addFields(
                    { name: 'Aktuální stupeň pohotovosti:', value: `${data['pesDescription']}` },
                    { name: 'Co to znamená?', value: `${data['pesMeaning']}` },
                    { name: 'Více informací můžete nalézt na stránkách MZČR:', value: 'https://onemocneni-aktualne.mzcr.cz/pes' }
                )
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(inviteEmbed);
        }
        case 'info': {
            const authorAvatarURL = message.author.avatarURL();
            const infoEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('COVID-19 Symptoms and info:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields(
                    { name: "Source: WHO", value: `${dFormat.covidInfo()}` }
                )
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(infoEmbed);
        }
        case 'help': {
            const embedHelp = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('Commands for the CoronaBot:')
                .setAuthor('CoronaBot', coronaLogo)
                .addFields(
                    { name: 'To show total numbers from countries all around the world use:', value: '.corona world', inline: true },
                    { name: 'To show info and numbers about specific country use:', value: '.corona <country>', inline: true },
                    { name: 'To show verified informations about symptoms of the COVID-19:', value: '.corona info', inline: true },
                    { name: 'To show version of the bot use:', value: '.corona version', inline: true },
                    { name: 'To show overall performance of the bot use:', value: '.corona ping', inline: true },
                    { name: 'To invite this bot on your server use:', value: '.corona invite', inline: true },
                    { name: 'To show on how many servers CoronaBot is:', value: '.corona servers', inline: true },
                    { name: 'To show authors of the CoronaBot:', value: '.corona authors', inline: true }
                )
                .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#1973)', 'https://jkanka.cz/ikonka.png');
            return message.channel.send(embedHelp);
        }
        case 'world': {
            const data = await apireq.getDataOfWorld();
            const world_object: World = new World(data['cases'], data['deaths'], data['recovered'], data['tests'], data['active'], data['critical'], data['todayCases'], data['todayDeaths'], data['todayRecovered'], data['affectedCountries']);
            const authorAvatarURL = message.author.avatarURL();
            const worldEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('COVID-19 World cases:')
                .setAuthor('CoronaBot', coronaLogo)
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
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(worldEmbed);
        }
        default: {
            let countryName = message.content.slice(prefix.length).trimLeft();
            const data = await apireq.getDataOfCountry(countryName);
            const wrongCountry = await apireq.checkIfRightCountry(data['country']);
            if (wrongCountry === true) {
                const embedWrongCountry = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .addFields(
                        { name: 'ERROR! :no_entry_sign:', value: 'You have written wrong country name or database is unavailable. Try it again.' }
                    )
                return message.channel.send(embedWrongCountry);
            } else {
                const country_object: Country = new Country(data['country'], data['countryInfo']['iso2'], data['continent'], data['cases'], data['tests'], data['critical'], data['deaths'], data['recovered'], data['active'], data['todayCases'], data['todayDeaths'], data['todayRecovered']);
                const authorAvatarURL = message.author.avatarURL();
                const countryEmbed = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('COVID-19 cases in ' + country_object.get_name + ' ' + country_object.get_flag_emoji)
                    .setAuthor('CoronaBot', coronaLogo)
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
                                                                       **Today's recovered:** ${country_object.get_today_recovered}`
                        }
                    )
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
                return message.channel.send(countryEmbed);
            }
        }
    }
})

client.login(token);