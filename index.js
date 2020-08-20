const Discord = require('discord.js');
const client = new Discord.Client();
const os = require('os');
const { prefix, token, version, WHOInfo, inviteLink } = require('./config.json');
const chalk = require('chalk');
const apireq = require('./apireq');
const webserver = require('./webserver');

const systemName = os.type()
const systemRam = Math.round(os.totalmem() * 0.000001) + ' Mb (' + Math.round(os.freemem() * 0.000001) + ' Mb FREE)'
const nodeVersion = process.version

// Clears console on start
console.clear()

client.once('ready', async () => {
    // Prints basic info about server and status
    console.log(chalk.green.bold('[INFO]') + ' Bot is online! Bot version: ' + version);
    console.log(chalk.green.bold('[INFO]') + ' Server is running on ' + systemName + ', Node.js version: ' + nodeVersion)
    console.log(chalk.green.bold('[INFO]') + ' Total RAM on server: ' + systemRam)
    console.log(chalk.green.bold('[INFO]') + ' Name: ' + client.user.username)
    console.log(chalk.green.bold('[INFO]') + ' ID: ' + client.user.id)
    // Start a webserver for online control
    webserver.startWebServer()
    // Checks if API works. If not stop bot.
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
        const embedVersion = new Discord.MessageEmbed()
        .setColor('#FF6347')
        .setAuthor('CoronaBot', 'https://iili.io/d0jzrP.png')
        .addFields(
            { name: 'Bot version:', value: version },
            { name: 'Node.JS version:', value: nodeVersion },
            { name: 'GitHub repository:', value: 'https://github.com/kankajm/CoronaDiscordBotJS' },
        )
        return message.channel.send(embedVersion)
    }
    else if (command === 'servers') {
        return message.channel.send(`CoronaBot is on ${client.guilds.cache.size} servers! Add him on your server too: ${inviteLink}`)
    }
    else if (command === 'ping') {
        const ping = Date.now() - message.createdTimestamp + " ms"
        const embedPing = new Discord.MessageEmbed()
        .setColor('#FF6347')
        .setTitle('Bot performance test:')
        .setAuthor('CoronaBot', 'https://iili.io/d0jzrP.png')
        .addFields(
            { name: 'Bot ping:', value: ping },
            { name: 'CoronaAPI status:', value: await apireq.getAPIStatus() },
        )
        return message.channel.send(embedPing)
    }
    else if (command === 'invite') {
        return message.channel.send(`${message.author}, to invite this bot on your server use: ${inviteLink}`)
    }
    else if (command === 'info') {
        return message.channel.send(`${message.author}, ${WHOInfo}`)
    }
    else if (command === 'help') {
        const embedHelp = new Discord.MessageEmbed()
        .setColor('#FF6347')
        .setTitle('Commands for the CoronaBot:')
        .setAuthor('CoronaBot', 'https://iili.io/d0jzrP.png')
        .addFields(
            { name: 'To show total numbers from countries all around the world use:', value: '.corona overview', inline: true },
            { name: 'To show official numbers for the Czech Republic use:', value: '.corona czechia', inline: true },
            { name: 'To show info and numbers about specific country use:', value: '.corona <country>', inline: true },
            { name: 'To show verified info about symptoms of the COVID-19:', value: '.corona info', inline: true },
            { name: 'To show version of the bot use:', value: '.corona version', inline: true },
            { name: 'To show ping of the bot use:', value: '.corona ping', inline: true },
            { name: 'To invite this bot on your server use:', value: '.corona invite', inline: true },
        )
        .setFooter('Created by Jaroslav Kaňka (kanka@jkanka.cz or kankaj#1973)', 'https://jkanka.cz/ikonka.png')
        return message.channel.send(embedHelp)
    }
    else if (command === 'world' | command == 'overview') {
        const data = await apireq.getDataOfWorld()
        return message.channel.send(`${message.author}, there's ${data['cases']} cases in a world right now, ${data['deaths']} deaths and ${data['recovered']} people recovered from the COVID-19.`)
    }
    else {
        let countryName = message.content.slice(prefix.length).trimLeft()
        if (countryName === 'S.Korea') {
            countryName = 'S. Korea'
        }
        const data = await apireq.getDataOfCountry(countryName)
        const wrongCountry = await apireq.checkIfRightCountry(data['country'])
        if (wrongCountry === true) {
            return message.channel.send(`${message.author}, you have written wrong country name or database is unavaible. Try it again.`)
        } else {
            if (data['country'] === 'Czechia') {
                return message.channel.send(`${message.author}, According to Ministry of Health of the Czech Republic, Czechia has tested ${data['totalTests']} people. To this date Czechia have ${data['cases']} cases, ${data['deaths']} deaths and ${data['recovered']} people recovered from the COVID-19. Today was detected ${data['todayCases']} cases and ${data['todayDeaths']} deaths. Source: http://tiny.cc/mzcr-covid, Ministerstvo zdravotnictví České republiky.`)
            } else {
                return message.channel.send(`${message.author}, ${data['country']} has ${data['cases']} cases and ${data['deaths']} deaths. Today there are ${data['todayCases']} cases and ${data['todayDeaths']} deaths. ${data['recovered']} people recovered. They're still ${data['active']} active cases and ${data['critical']} people are in critical condition. The concentration of cases in ${data['country']} is ${data['casesPerOneMillion']} cases per one milion citizens.`)
            }
        }
    }
});

client.login(token);