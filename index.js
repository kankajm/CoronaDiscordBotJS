const Discord = require('discord.js');
const client = new Discord.Client();
const os = require('os');
const { prefix, token, version, inviteLink, embedColor, coronaLogo } = require('./config.json');
const chalk = require('chalk');
const apireq = require('./apireq');
const webserver = require('./webserver');
const dFormat = require('./data_formatting');

const systemName = os.type()
const systemRam = Math.round(os.totalmem() * 0.000001) + ' Mb (' + Math.round(os.freemem() * 0.000001) + ' Mb FREE)'
const nodeVersion = process.version

// Clears console on start
console.clear()

client.once('ready', async () => {
    // Prints basic info about server and status
    console.log(chalk.green.bold('[INFO]') + ' Bot is online! Bot version: ' + version)
    console.log(chalk.green.bold('[INFO]') + ' Server is running on ' + systemName + ', Node.js version: ' + nodeVersion)
    console.log(chalk.green.bold('[INFO]') + ' Total RAM on server: ' + systemRam)
    console.log(chalk.green.bold('[INFO]') + ' Name: ' + client.user.username)
    console.log(chalk.green.bold('[INFO]') + ' ID: ' + client.user.id)
    // Start a webserver for online control
    webserver.startWebServer()
    // Checks if APIs works. If not stop bot.
    const apiStatus = await apireq.getAPIStatus()
    if (apiStatus === "API DOWN!") {
        console.log(chalk.red.bold('[CRITICAL ERROR]') + ' API DOES NOT WORK.')
        process.exit(1)
    } else {
        console.log(chalk.green.bold('[INFO]') + ' API works so bot can serve requests now.')
    }
    // Print Rich Presence
    client.user.setActivity('.corona help', { type: 'PLAYING' })
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'version') {
        const authorAvatarURL = message.author.avatarURL()
        const embedVersion = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setAuthor('CoronaBot', coronaLogo)
        .addFields(
            { name: 'Bot version:', value: version },
            { name: 'Node.JS version:', value: nodeVersion },
            { name: 'GitHub repository:', value: 'https://github.com/kankajm/CoronaDiscordBotJS' },
        )
        .setTimestamp()
        .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
        return message.channel.send(embedVersion)
    }
    else if (command === 'servers') {
        const authorAvatarURL = message.author.avatarURL()
        const embedServers = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle('CoronaBot Servers :desktop:')
        .setAuthor('CoronaBot', coronaLogo)
        .addFields(
            { name: 'CoronaBot is already on ' + dFormat.formatNumber(client.guilds.cache.size) + ' servers! :sunglasses:', value: `If you like the bot and you want him on your server, you can add him with this link: ${inviteLink}`}
        )
        .setTimestamp()
        .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
        return message.channel.send(embedServers)
    }
    else if (command === 'performance' | command === 'ping') {
        const ping = Date.now() - message.createdTimestamp + " ms"
        const authorAvatarURL = message.author.avatarURL()
        const embedPing = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle('Bot performance test:')
        .setAuthor('CoronaBot', coronaLogo)
        .addFields(
            { name: 'Bot ping:', value: ping },
            { name: 'CoronaAPI status:', value: await apireq.getAPIStatus() }
        )
        .setTimestamp()
        .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
        return message.channel.send(embedPing)
    }
    else if (command === 'authors') {
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
        .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#1973)', 'https://jkanka.cz/ikonka.png')
        return message.channel.send(embedAuthors)
    }
    else if (command === 'invite') {
        const authorAvatarURL = message.author.avatarURL()
        const inviteEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle('CoronaBot Invite link :star_struck:')
        .setAuthor('CoronaBot', coronaLogo)
        .addFields(
            { name: "*If you like CoronaBot you can add him on your server!*  :sunglasses:", value: `Here's your invite link: ${inviteLink}` }
        )
        .setTimestamp()
        .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
        return message.channel.send(inviteEmbed)
    }
    else if (command === 'info') {
        const data = await apireq.getDataOfWorld()
        const authorAvatarURL = message.author.avatarURL()
        const infoEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle('COVID-19 Symptoms and info:')
        .setAuthor('CoronaBot', coronaLogo)
        .addFields(
            { name: "Source: WHO", value: `${dFormat.covidInfo()}` }
        )
        .setTimestamp()
        .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
        return message.channel.send(infoEmbed)
    }
    else if (command === 'help') {
        const embedHelp = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle('Commands for the CoronaBot:')
        .setAuthor('CoronaBot', coronaLogo)
        .addFields(
            { name: 'To show total numbers from countries all around the world use:', value: '.corona world', inline: true },
            { name: 'To show info and numbers about specific country use:', value: '.corona <country>', inline: true },
            { name: 'To show verified informations about symptoms of the COVID-19:', value: '.corona info', inline: true },
            { name: 'To show version of the bot use:', value: '.corona version', inline: true },
            { name: 'To show overall performance of the bot use:', value: '.corona performance', inline: true },
            { name: 'To invite this bot on your server use:', value: '.corona invite', inline: true },
            { name: 'To show authors of the CoronaBot:', value: '.corona authors', inline: true }
        )
        .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#1973)', 'https://jkanka.cz/ikonka.png')
        return message.channel.send(embedHelp)
    }
    else if (command === 'world' | command == 'overview') {
        const data = await apireq.getDataOfWorld()
        const authorAvatarURL = message.author.avatarURL()
        const worldEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle('COVID-19 World cases:')
        .setAuthor('CoronaBot', coronaLogo)
        .addFields(
            { name: "*Here is your data boss* :sunglasses:", value: `**Total cases:** ${dFormat.formatNumber(data['cases'])}
                                                                     **Total deaths:** ${dFormat.formatNumber(data['deaths'])}
                                                                     **Total recovered:** ${dFormat.formatNumber(data['recovered'])}
                                                                     **Total tests:** ${dFormat.formatNumber(data['tests'])}
                                                                     **Active cases:** ${dFormat.formatNumber(data['active'])}
                                                                     **Critical cases:** ${dFormat.formatNumber(data['critical'])}
                                                                     **Today's cases:** ${dFormat.formatNumber(data['todayCases'])}
                                                                     **Today's deaths:** ${dFormat.formatNumber(data['todayDeaths'])}
                                                                     **Today's recovered:** ${dFormat.formatNumber(data['todayRecovered'])}
                                                                     **Affected countries:** ${dFormat.formatNumber(data['affectedCountries'])}` }
        )
        .setTimestamp()
        .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
        return message.channel.send(worldEmbed)
    }
    else {
        let countryName = message.content.slice(prefix.length).trimLeft()
        const data = await apireq.getDataOfCountry(countryName)
        const wrongCountry = await apireq.checkIfRightCountry(data['country'])
        if (wrongCountry === true) {
            const embedWrongCountry = new Discord.MessageEmbed()
            .setColor(embedColor)
            .addFields(
                { name: 'ERROR! :no_entry_sign:', value: 'You have written wrong country name or database is unavailable. Try it again.' }
            )
            return message.channel.send(embedWrongCountry)
        } else {
            const authorAvatarURL = message.author.avatarURL()
            const dataCountryInfo = data['countryInfo']
            const iso2 = dataCountryInfo['iso2']
            const countryEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle('COVID-19 cases in ' + data['country'] + ' ' + dFormat.createFlagEmoji(iso2))
            .setAuthor('CoronaBot', coronaLogo)
            .addFields(
                { name: "*Here is your data boss* :sunglasses:", value: `**Total cases:** ${dFormat.formatNumber(data['cases'])}
                                                                       **Total deaths:** ${dFormat.formatNumber(data['deaths'])}
                                                                       **Total recovered:** ${dFormat.formatNumber(data['recovered'])}
                                                                       **Total tests:** ${dFormat.formatNumber(data['tests'])}
                                                                       **Active cases:** ${dFormat.formatNumber(data['active'])}
                                                                       **Critical condition:** ${dFormat.formatNumber(data['critical'])}
                                                                       **Today's cases:** ${dFormat.formatNumber(data['todayCases'])}
                                                                       **Today's deaths:** ${dFormat.formatNumber(data['todayDeaths'])}
                                                                       **Today's recovered:** ${dFormat.formatNumber(data['todayRecovered'])}` }
            )
            .setTimestamp()
            .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
            return message.channel.send(countryEmbed)
        }
    }
});

client.login(token);