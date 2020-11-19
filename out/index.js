"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require('discord.js');
var client = new Discord.Client();
var os = require('os');
var _a = require('../config.json'), prefix = _a.prefix, token = _a.token, version = _a.version, inviteLink = _a.inviteLink, embedColor = _a.embedColor, coronaLogo = _a.coronaLogo, lastUpdate = _a.lastUpdate;
var apireq = require('./apireq');
var dFormat = require('./data_formatting');
var Country_1 = require("./models/Country");
var World_1 = require("./models/World");
var systemName = os.type();
var nodeVersion = process.version;
// Clears console on start
console.clear();
client.once('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    var apiStatus;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Prints basic info about server and status
                console.log("Bot is online! Bot version: " + version);
                console.log("Server is running on " + systemName + ", Node.js version: " + nodeVersion);
                console.log("Name: " + client.user.username);
                console.log("ID: " + client.user.id);
                return [4 /*yield*/, apireq.getAPIStatus()];
            case 1:
                apiStatus = _a.sent();
                if (apiStatus === "API DOWN!") {
                    console.log('API DOES NOT WORK.');
                    process.exit();
                }
                else {
                    console.log('API works so bot can serve requests now.');
                }
                return [2 /*return*/];
        }
    });
}); });
// Print Rich Presence (changes every 8sec).
client.on('ready', function () {
    setInterval(function () {
        client.user.setActivity(dFormat.getOneRPC(client.guilds.cache.size), { type: 'PLAYING' });
    }, 8000);
});
// Listens to Admin commands requested by Developers.
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var botAdminPrefix, messageAuthor, args, command;
    return __generator(this, function (_a) {
        botAdminPrefix = ".coronadev";
        messageAuthor = message.author.id;
        args = message.content.slice(botAdminPrefix.length).trim().split(' ');
        command = args.shift().toLowerCase();
        if (!message.content.startsWith(botAdminPrefix) || message.author.bot)
            return [2 /*return*/];
        // allows only if users are kankaj or R4Y.
        if (messageAuthor === "161071543584030720" || messageAuthor === "432250055949549579") {
            // Restart command. (PM2)
            if (command === 'restart') {
                console.log("RESTART BY " + message.author.username);
                process.exit();
            }
        }
        return [2 /*return*/];
    });
}); });
// Listens to all users.
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var args, command, _a, authorAvatarURL, embedVersion, authorAvatarURL, embedServers, ping, authorAvatarURL, embedPing, _b, _c, _d, embedAuthors, authorAvatarURL, inviteEmbed, authorAvatarURL, infoEmbed, embedHelp, data, world_object, authorAvatarURL, worldEmbed, countryName, data, wrongCountry, embedWrongCountry, country_object, authorAvatarURL, countryEmbed;
    var _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (!message.content.startsWith(prefix) || message.author.bot || message.content.startsWith('.coronadev'))
                    return [2 /*return*/];
                args = message.content.slice(prefix.length).trim().split(' ');
                command = args.shift().toLowerCase();
                _a = command;
                switch (_a) {
                    case 'version': return [3 /*break*/, 1];
                    case 'servers': return [3 /*break*/, 2];
                    case 'ping': return [3 /*break*/, 3];
                    case 'authors': return [3 /*break*/, 5];
                    case 'invite': return [3 /*break*/, 6];
                    case 'info': return [3 /*break*/, 7];
                    case 'help': return [3 /*break*/, 8];
                    case 'world': return [3 /*break*/, 9];
                }
                return [3 /*break*/, 11];
            case 1:
                {
                    authorAvatarURL = message.author.avatarURL();
                    embedVersion = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setAuthor('CoronaBot', coronaLogo)
                        .addFields({ name: 'Bot version:', value: version }, { name: 'Node.JS version:', value: nodeVersion }, { name: 'Last update:', value: lastUpdate }, { name: 'GitHub repository:', value: 'https://github.com/kankajm/CoronaDiscordBotJS' })
                        .setTimestamp()
                        .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, authorAvatarURL);
                    return [2 /*return*/, message.channel.send(embedVersion)];
                }
                _f.label = 2;
            case 2:
                {
                    authorAvatarURL = message.author.avatarURL();
                    embedServers = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setTitle('CoronaBot Servers :desktop:')
                        .setAuthor('CoronaBot', coronaLogo)
                        .addFields({ name: 'CoronaBot is already on ' + client.guilds.cache.size + ' servers! :sunglasses:', value: "If you like the bot and you want him on your server, you can add him with this link: " + inviteLink })
                        .setTimestamp()
                        .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, authorAvatarURL);
                    return [2 /*return*/, message.channel.send(embedServers)];
                }
                _f.label = 3;
            case 3:
                ping = Date.now() - message.createdTimestamp + " ms";
                authorAvatarURL = message.author.avatarURL();
                _c = (_b = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('Bot performance test:')
                    .setAuthor('CoronaBot', coronaLogo))
                    .addFields;
                _d = [{ name: 'Bot ping:', value: ping }];
                _e = { name: 'CoronaAPI status:' };
                return [4 /*yield*/, apireq.getAPIStatus()];
            case 4:
                embedPing = _c.apply(_b, _d.concat([(_e.value = _f.sent(), _e)]))
                    .setTimestamp()
                    .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, authorAvatarURL);
                return [2 /*return*/, message.channel.send(embedPing)];
            case 5:
                {
                    embedAuthors = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setTitle('Authors of CoronaBot :tools:')
                        .setAuthor('CoronaBot', coronaLogo)
                        .setDescription('*People who programmed or helped make CoronaBot better!*')
                        .addFields({ name: 'Creator and main programmer:', value: "Jaroslav Kaňka (kankaj#1973) :flag_cz:" }, { name: 'Bug hunter and programmer:', value: "Rayan Yessou (.[R4y]#3430) :flag_it:" }, { name: 'Bot tester:', value: "Ondřej Štěch (Spike#5530) :flag_cz:" })
                        .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#1973)', 'https://jkanka.cz/ikonka.png');
                    return [2 /*return*/, message.channel.send(embedAuthors)];
                }
                _f.label = 6;
            case 6:
                {
                    authorAvatarURL = message.author.avatarURL();
                    inviteEmbed = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setTitle('CoronaBot Invite link :star_struck:')
                        .setAuthor('CoronaBot', coronaLogo)
                        .addFields({ name: "*If you like CoronaBot you can add him on your server!*  :sunglasses:", value: "Here's your invite link: " + inviteLink })
                        .setTimestamp()
                        .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, authorAvatarURL);
                    return [2 /*return*/, message.channel.send(inviteEmbed)];
                }
                _f.label = 7;
            case 7:
                {
                    authorAvatarURL = message.author.avatarURL();
                    infoEmbed = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setTitle('COVID-19 Symptoms and info:')
                        .setAuthor('CoronaBot', coronaLogo)
                        .addFields({ name: "Source: WHO", value: "" + dFormat.covidInfo() })
                        .setTimestamp()
                        .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, authorAvatarURL);
                    return [2 /*return*/, message.channel.send(infoEmbed)];
                }
                _f.label = 8;
            case 8:
                {
                    embedHelp = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setTitle('Commands for the CoronaBot:')
                        .setAuthor('CoronaBot', coronaLogo)
                        .addFields({ name: 'To show total numbers from countries all around the world use:', value: '.corona world', inline: true }, { name: 'To show info and numbers about specific country use:', value: '.corona <country>', inline: true }, { name: 'To show verified informations about symptoms of the COVID-19:', value: '.corona info', inline: true }, { name: 'To show version of the bot use:', value: '.corona version', inline: true }, { name: 'To show overall performance of the bot use:', value: '.corona ping', inline: true }, { name: 'To invite this bot on your server use:', value: '.corona invite', inline: true }, { name: 'To show on how many servers CoronaBot is:', value: '.corona servers', inline: true }, { name: 'To show authors of the CoronaBot:', value: '.corona authors', inline: true })
                        .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#1973)', 'https://jkanka.cz/ikonka.png');
                    return [2 /*return*/, message.channel.send(embedHelp)];
                }
                _f.label = 9;
            case 9: return [4 /*yield*/, apireq.getDataOfWorld()];
            case 10:
                data = _f.sent();
                world_object = new World_1.World(data['cases'], data['deaths'], data['recovered'], data['tests'], data['active'], data['critical'], data['todayCases'], data['todayDeaths'], data['todayRecovered'], data['affectedCountries']);
                authorAvatarURL = message.author.avatarURL();
                worldEmbed = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('COVID-19 World cases:')
                    .setAuthor('CoronaBot', coronaLogo)
                    .addFields({
                    name: "*Here is your data boss* :sunglasses:",
                    value: "**Total cases:** " + world_object.get_cases + "\n                                                                     **Total deaths:** " + world_object.get_deaths + "\n                                                                     **Total recovered:** " + world_object.get_recovered + "\n                                                                     **Total tests:** " + world_object.get_tests + "\n                                                                     **Active cases:** " + world_object.get_active + "\n                                                                     **Critical cases:** " + world_object.get_critical + "\n                                                                     **Today's cases:** " + world_object.get_today_cases + "\n                                                                     **Today's deaths:** " + world_object.get_today_deaths + "\n                                                                     **Today's recovered:** " + world_object.get_today_recovered + "\n                                                                     **Affected countries:** " + world_object.get_affected_countries
                })
                    .setTimestamp()
                    .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, authorAvatarURL);
                return [2 /*return*/, message.channel.send(worldEmbed)];
            case 11:
                countryName = message.content.slice(prefix.length).trimLeft();
                return [4 /*yield*/, apireq.getDataOfCountry(countryName)];
            case 12:
                data = _f.sent();
                return [4 /*yield*/, apireq.checkIfRightCountry(data['country'])];
            case 13:
                wrongCountry = _f.sent();
                if (wrongCountry === true) {
                    embedWrongCountry = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .addFields({ name: 'ERROR! :no_entry_sign:', value: 'You have written wrong country name or database is unavailable. Try it again.' });
                    return [2 /*return*/, message.channel.send(embedWrongCountry)];
                }
                else {
                    country_object = new Country_1.Country(data['country'], data['countryInfo']['iso2'], data['continent'], data['cases'], data['tests'], data['critical'], data['deaths'], data['recovered'], data['active'], data['todayCases'], data['todayDeaths'], data['todayRecovered']);
                    authorAvatarURL = message.author.avatarURL();
                    countryEmbed = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setTitle('COVID-19 cases in ' + country_object.get_name + ' ' + country_object.get_flag_emoji)
                        .setAuthor('CoronaBot', coronaLogo)
                        .addFields({
                        name: "*Here is your data boss* :sunglasses:",
                        value: "**Total cases:** " + country_object.get_cases + "\n                                                                       **Total deaths:** " + country_object.get_deaths + "\n                                                                       **Total recovered:** " + country_object.get_recovered + "\n                                                                       **Total tests:** " + country_object.get_tests + "\n                                                                       **Active cases:** " + country_object.get_active_cases + "\n                                                                       **Critical condition:** " + country_object.get_critical_cases + "\n                                                                       **Today's cases:** " + country_object.get_today_cases + "\n                                                                       **Today's deaths:** " + country_object.get_today_deaths + "\n                                                                       **Today's recovered:** " + country_object.get_today_recovered
                    })
                        .setTimestamp()
                        .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, authorAvatarURL);
                    return [2 /*return*/, message.channel.send(countryEmbed)];
                }
                _f.label = 14;
            case 14: return [2 /*return*/];
        }
    });
}); });
client.login(token);
