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
var _a = require('../config.json'), prefix = _a.prefix, version = _a.version, inviteLink = _a.inviteLink, embedColor = _a.embedColor, coronaLogo = _a.coronaLogo, lastUpdate = _a.lastUpdate;
var dotenv = require('dotenv');
dotenv.config();
var _b = require('./core/systemInfo'), systemName = _b.systemName, nodeVersion = _b.nodeVersion;
var _c = require('./core/apiRequests'), getDataOfCountry = _c.getDataOfCountry, checkIfRightCountry = _c.checkIfRightCountry, getDataOfWorld = _c.getDataOfWorld, scrapePESNumber = _c.scrapePESNumber, APIStatusCode = _c.APIStatusCode;
var initializeBot = require('./core/initialize').initializeBot;
var richPresence = require('./core/rpc').richPresence;
var getPESData = require('./core/scraping/pes').getPESData;
var covidInfo = require('./core/covidInfo').covidInfo;
var Discord = require('discord.js');
var client = new Discord.Client();
var Country_1 = require("./models/Country");
var World_1 = require("./models/World");
// Clears console on start
console.clear();
client.once('ready', function () {
    // core/initialize.ts
    initializeBot(version, systemName, nodeVersion, client.user.username, client.user.id);
});
// Print Rich Presence (changes every 8sec).
client.on('ready', function () {
    setInterval(function () {
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
                console.log("RESTART BY " + message.author.username); // Log it locally
                process.exit();
            }
        }
        return [2 /*return*/];
    });
}); });
// Listens to all users.
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var args, command, _a, authorAvatarURL, embedServers, authorAvatarURL, embedVersion, ping, authorAvatarURL, apiStatusCode, apiStatusFormatted, embedPing, embedAuthors, authorAvatarURL, inviteEmbed, pesNumber, data, thumbnail, authorAvatarURL, inviteEmbed, authorAvatarURL, infoEmbed, embedHelp, data, world_object, authorAvatarURL, worldEmbed, countryName, data, wrongCountry, embedWrongCountry, country_object, authorAvatarURL, countryEmbed;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!message.content.startsWith(prefix) || message.author.bot || message.content.startsWith('.coronadev'))
                    return [2 /*return*/];
                args = message.content.slice(prefix.length).trim().split(' ');
                command = args.shift().toLowerCase();
                _a = command;
                switch (_a) {
                    case 'servers': return [3 /*break*/, 1];
                    case 'version': return [3 /*break*/, 2];
                    case 'ping': return [3 /*break*/, 3];
                    case 'authors': return [3 /*break*/, 5];
                    case 'invite': return [3 /*break*/, 6];
                    case 'pes': return [3 /*break*/, 7];
                    case 'info': return [3 /*break*/, 10];
                    case 'help': return [3 /*break*/, 11];
                    case 'world': return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 1:
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
                _b.label = 2;
            case 2:
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
                _b.label = 3;
            case 3:
                ping = Date.now() - message.createdTimestamp + " ms";
                authorAvatarURL = message.author.avatarURL();
                return [4 /*yield*/, APIStatusCode()];
            case 4:
                apiStatusCode = _b.sent();
                apiStatusFormatted = apiStatusFormatter(apiStatusCode);
                embedPing = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('Bot performance test:')
                    .setAuthor('CoronaBot', coronaLogo)
                    .addFields({ name: 'Bot ping:', value: ping }, { name: 'CoronaAPI status:', value: apiStatusFormatted })
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
                        .addFields({ name: 'Creator and main programmer:', value: "Jaroslav Kaňka (kankaj#2731) :flag_cz:" }, { name: 'Bug hunter and programmer:', value: "Rayan Yessou (.[R4y]#3430) :flag_it:" }, { name: 'Bot tester:', value: "Ondřej Štěch (Spike#5530) :flag_cz:" }, { name: 'CoronaBot Logo:', value: "Tadeáš Poplužník (Tágo#4220) :flag_cz:" })
                        .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#2731)', 'https://ourghtfu.sirv.com/Images/czechIcon.png');
                    return [2 /*return*/, message.channel.send(embedAuthors)];
                }
                _b.label = 6;
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
                _b.label = 7;
            case 7: return [4 /*yield*/, scrapePESNumber()];
            case 8:
                pesNumber = _b.sent();
                return [4 /*yield*/, getPESData(pesNumber)];
            case 9:
                data = _b.sent();
                thumbnail = data.PESEmotion;
                authorAvatarURL = message.author.avatarURL();
                inviteEmbed = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('PES (Protiepidemický systém ČR)')
                    .setAuthor('CoronaBot', coronaLogo)
                    .setThumbnail("" + thumbnail)
                    .addFields({ name: 'Aktuální stupeň pohotovosti:', value: "" + data.description }, { name: 'Co to znamená?', value: "" + data.meaning }, { name: 'Více informací můžete nalézt na stránkách MZČR:', value: 'https://onemocneni-aktualne.mzcr.cz/pes' })
                    .setTimestamp()
                    .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, authorAvatarURL);
                return [2 /*return*/, message.channel.send(inviteEmbed)];
            case 10:
                {
                    authorAvatarURL = message.author.avatarURL();
                    infoEmbed = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setTitle('COVID-19 Symptoms and info:')
                        .setAuthor('CoronaBot', coronaLogo)
                        .addFields({ name: "Source: WHO", value: "" + covidInfo })
                        .setTimestamp()
                        .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator, authorAvatarURL);
                    return [2 /*return*/, message.channel.send(infoEmbed)];
                }
                _b.label = 11;
            case 11:
                {
                    embedHelp = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setTitle('Commands for the CoronaBot:')
                        .setAuthor('CoronaBot', coronaLogo)
                        .addFields({ name: 'To show total numbers from countries all around the world use:', value: '.corona world', inline: true }, { name: 'To show info and numbers about specific country use:', value: '.corona <country>', inline: true }, { name: 'To show verified informations about symptoms of the COVID-19:', value: '.corona info', inline: true }, { name: 'To show version of the bot use:', value: '.corona version', inline: true }, { name: 'To show overall performance of the bot use:', value: '.corona ping', inline: true }, { name: 'To invite this bot on your server use:', value: '.corona invite', inline: true }, { name: 'To show on how many servers CoronaBot is:', value: '.corona servers', inline: true }, { name: 'To show authors of the CoronaBot:', value: '.corona authors', inline: true }, { name: 'CZ ONLY: Zobrazí aktuální skóre systému PES', value: '.corona pes', inline: true })
                        .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#2731)', 'https://ourghtfu.sirv.com/Images/czechIcon.png');
                    return [2 /*return*/, message.channel.send(embedHelp)];
                }
                _b.label = 12;
            case 12: return [4 /*yield*/, getDataOfWorld()];
            case 13:
                data = _b.sent();
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
            case 14:
                countryName = message.content.slice(prefix.length).trimLeft();
                return [4 /*yield*/, getDataOfCountry(countryName)];
            case 15:
                data = _b.sent();
                return [4 /*yield*/, checkIfRightCountry(data['country'])];
            case 16:
                wrongCountry = _b.sent();
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
                _b.label = 17;
            case 17: return [2 /*return*/];
        }
    });
}); });
client.login(process.env.DISCORD_TOKEN);
