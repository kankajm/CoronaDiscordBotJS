const { prefix, version, inviteLink, embedColor, coronaLogo, lastUpdate } = require('../config.json');

const dotenv = require('dotenv');
dotenv.config();

const { systemName, nodeVersion } = require('./core/systemInfo');
const { initializeBot } = require('./core/initialize');
const { richPresence } = require('./core/rpc');

const WOKCommands = require('wokcommands');

const Discord = require('discord.js');
const client = new Discord.Client();

// ID of test guild for checking ids of slash commands
const testGuildId: string = '691673522669355008';

// Clears console on start
console.clear();

client.once('ready', () => {
    // core/initialize.ts
    initializeBot(version, systemName, nodeVersion, client.user.username, client.user.id);
});

// Print Rich Presence (changes every 10sec).
client.on('ready', () => {
    setInterval(() => {
        let rpText: string = richPresence(client.guilds.cache.size)
        client.user.setPresence({ activity: { name: rpText }, status: 'dnd' });
    }, 10000);
});

client.on('ready', () => {
    new WOKCommands(client, {
        commandsDir: 'commands',
        ignoreBots: true,
        testServers: [testGuildId],
        showWarns: false,
    }).setCategorySettings([
        {
            name: 'Fun',
            emoji: ':joy:'
        },
        {
            name: 'Help',
            emoji: ':helmet_with_cross:'
        },
        {
            name: 'Misc',
            emoji: ':ninja:'
        }
    ]).setBotOwner(['161071543584030720']);
})

// Listens for legacy commands and redirect user to slash commands.
client.on('message', async message => {
    if (message.content.startsWith(prefix)) {
        const embedRedirect = new Discord.MessageEmbed()
        .setAuthor('CoronaBot', coronaLogo)
        .setColor(embedColor)
        .addFields(
            { name: 'PREFIX .corona IS NO LONGER USED!', value: "Discord implemented new way of creating and using commands! It's called 'Slash commands' and it unifies all bot prefixes into one. Use /help to see all new commands that you can use." }
        );
        message.channel.send(embedRedirect);
    }
});

// Test command just for owner.
client.on('message', async message => {
    if (message.content.startsWith('!users') && message.author.id == "161071543584030720") { 
        message.channel.send(message.client.users.cache.size);
    }
});

client.login(process.env.DISCORD_TOKEN);