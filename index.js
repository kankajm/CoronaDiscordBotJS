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
var _this = this;
var Discord = require('discord.js');
var client = new Discord.Client();
var os = require('os');
var _a = require('./config.json'), prefix = _a.prefix, token = _a.token, version = _a.version, inviteLink = _a.inviteLink, embedColor = _a.embedColor, coronaLogo = _a.coronaLogo;
var apireq = require('./apireq');
var webserver = require('./webserver');
var dFormat = require('./data_formatting');
var systemName = os.type();
var systemRam = Math.round(os.totalmem() * 0.000001) + ' Mb (' + Math.round(os.freemem() * 0.000001) + ' Mb FREE)';
var nodeVersion = process.version;
// Clears console on start
console.clear();
client.once('ready', function () { return __awaiter(_this, void 0, void 0, function () {
    var apiStatus;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Prints basic info about server and status
                console.log("Bot is online! Bot version: " + version);
                console.log("Server is running on " + systemName + ", Node.js version: " + nodeVersion);
                console.log("Total RAM on server: " + systemRam);
                console.log("Name: " + client.user.username);
                console.log("ID: " + client.user.id);
                // Start a webserver for online control
                webserver.startWebServer();
                return [4 /*yield*/, apireq.getAPIStatus()];
            case 1:
                apiStatus = _a.sent();
                if (apiStatus === "API DOWN!") {
                    console.log('API DOES NOT WORK.');
                }
                else {
                    console.log('API works so bot can serve requests now.');
                }
                // Print Rich Presence
                client.user.setActivity('.corona help', { type: 'PLAYING' });
                return [2 /*return*/];
        }
    });
}); });
client.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
    var args, command, authorAvatarURL, embedVersion, authorAvatarURL, embedServers, ping, authorAvatarURL, embedPing, _a, _b, _c, embedAuthors, authorAvatarURL, inviteEmbed, authorAvatarURL, infoEmbed, embedHelp, data, authorAvatarURL, worldEmbed, countryName, data, wrongCountry, embedWrongCountry, authorAvatarURL, dataCountryInfo, iso2, countryEmbed;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!message.content.startsWith(prefix) || message.author.bot)
                    return [2 /*return*/];
                args = message.content.slice(prefix.length).trim().split(' ');
                command = args.shift().toLowerCase();
                if (!(command === 'version')) return [3 /*break*/, 1];
                authorAvatarURL = message.author.avatarURL();
                embedVersion = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setAuthor('CoronaBot', coronaLogo)
                    .addFields({ name: 'Bot version:', value: version }, { name: 'Node.JS version:', value: nodeVersion }, { name: 'GitHub repository:', value: 'https://github.com/kankajm/CoronaDiscordBotJS' })
                    .setTimestamp()
                    .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
                return [2 /*return*/, message.channel.send(embedVersion)];
            case 1:
                if (!(command === 'servers')) return [3 /*break*/, 2];
                authorAvatarURL = message.author.avatarURL();
                embedServers = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('CoronaBot Servers :desktop:')
                    .setAuthor('CoronaBot', coronaLogo)
                    .addFields({ name: 'CoronaBot is already on ' + dFormat.formatNumber(client.guilds.cache.size) + ' servers! :sunglasses:', value: "If you like the bot and you want him on your server, you can add him with this link: " + inviteLink })
                    .setTimestamp()
                    .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
                return [2 /*return*/, message.channel.send(embedServers)];
            case 2:
                if (!(command === 'performance' || command === 'ping')) return [3 /*break*/, 4];
                ping = Date.now() - message.createdTimestamp + " ms";
                authorAvatarURL = message.author.avatarURL();
                _b = (_a = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('Bot performance test:')
                    .setAuthor('CoronaBot', coronaLogo))
                    .addFields;
                _c = [{ name: 'Bot ping:', value: ping }];
                _d = { name: 'CoronaAPI status:' };
                return [4 /*yield*/, apireq.getAPIStatus()];
            case 3:
                embedPing = _b.apply(_a, _c.concat([(_d.value = _e.sent(), _d)]))
                    .setTimestamp()
                    .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
                return [2 /*return*/, message.channel.send(embedPing)];
            case 4:
                if (!(command === 'authors')) return [3 /*break*/, 5];
                embedAuthors = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('Authors of CoronaBot :tools:')
                    .setAuthor('CoronaBot', coronaLogo)
                    .setDescription('*People who programmed or helped make CoronaBot better!*')
                    .addFields({ name: 'Creator and main programmer:', value: "Jaroslav Kaňka (kankaj#1973) :flag_cz:" }, { name: 'Bug hunter and programmer:', value: "Rayan Yessou (.[R4y]#3430) :flag_it:" }, { name: 'Bot tester:', value: "Ondřej Štěch (Spike#5530) :flag_cz:" })
                    .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#1973)', 'https://jkanka.cz/ikonka.png');
                return [2 /*return*/, message.channel.send(embedAuthors)];
            case 5:
                if (!(command === 'invite')) return [3 /*break*/, 6];
                authorAvatarURL = message.author.avatarURL();
                inviteEmbed = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('CoronaBot Invite link :star_struck:')
                    .setAuthor('CoronaBot', coronaLogo)
                    .addFields({ name: "*If you like CoronaBot you can add him on your server!*  :sunglasses:", value: "Here's your invite link: " + inviteLink })
                    .setTimestamp()
                    .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
                return [2 /*return*/, message.channel.send(inviteEmbed)];
            case 6:
                if (!(command === 'info')) return [3 /*break*/, 7];
                authorAvatarURL = message.author.avatarURL();
                infoEmbed = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('COVID-19 Symptoms and info:')
                    .setAuthor('CoronaBot', coronaLogo)
                    .addFields({ name: "Source: WHO", value: "" + dFormat.covidInfo() })
                    .setTimestamp()
                    .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
                return [2 /*return*/, message.channel.send(infoEmbed)];
            case 7:
                if (!(command === 'help')) return [3 /*break*/, 8];
                embedHelp = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('Commands for the CoronaBot:')
                    .setAuthor('CoronaBot', coronaLogo)
                    .addFields({ name: 'To show total numbers from countries all around the world use:', value: '.corona world', inline: true }, { name: 'To show info and numbers about specific country use:', value: '.corona <country>', inline: true }, { name: 'To show verified informations about symptoms of the COVID-19:', value: '.corona info', inline: true }, { name: 'To show version of the bot use:', value: '.corona version', inline: true }, { name: 'To show overall performance of the bot use:', value: '.corona performance', inline: true }, { name: 'To invite this bot on your server use:', value: '.corona invite', inline: true }, { name: 'To show on how many servers CoronaBot is:', value: '.corona servers', inline: true }, { name: 'To show authors of the CoronaBot:', value: '.corona authors', inline: true })
                    .setFooter('In case of any problem please contact me (kanka@jkanka.cz or kankaj#1973)', 'https://jkanka.cz/ikonka.png');
                return [2 /*return*/, message.channel.send(embedHelp)];
            case 8:
                if (!(command === 'world' || command == 'overview')) return [3 /*break*/, 10];
                return [4 /*yield*/, apireq.getDataOfWorld()];
            case 9:
                data = _e.sent();
                authorAvatarURL = message.author.avatarURL();
                worldEmbed = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setTitle('COVID-19 World cases:')
                    .setAuthor('CoronaBot', coronaLogo)
                    .addFields({ name: "*Here is your data boss* :sunglasses:", value: "**Total cases:** " + dFormat.formatNumber(data['cases']) + "\n                                                                     **Total deaths:** " + dFormat.formatNumber(data['deaths']) + "\n                                                                     **Total recovered:** " + dFormat.formatNumber(data['recovered']) + "\n                                                                     **Total tests:** " + dFormat.formatNumber(data['tests']) + "\n                                                                     **Active cases:** " + dFormat.formatNumber(data['active']) + "\n                                                                     **Critical cases:** " + dFormat.formatNumber(data['critical']) + "\n                                                                     **Today's cases:** " + dFormat.formatNumber(data['todayCases']) + "\n                                                                     **Today's deaths:** " + dFormat.formatNumber(data['todayDeaths']) + "\n                                                                     **Today's recovered:** " + dFormat.formatNumber(data['todayRecovered']) + "\n                                                                     **Affected countries:** " + dFormat.formatNumber(data['affectedCountries']) })
                    .setTimestamp()
                    .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
                return [2 /*return*/, message.channel.send(worldEmbed)];
            case 10:
                countryName = message.content.slice(prefix.length).trimLeft();
                return [4 /*yield*/, apireq.getDataOfCountry(countryName)];
            case 11:
                data = _e.sent();
                return [4 /*yield*/, apireq.checkIfRightCountry(data['country'])];
            case 12:
                wrongCountry = _e.sent();
                if (wrongCountry === true) {
                    embedWrongCountry = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .addFields({ name: 'ERROR! :no_entry_sign:', value: 'You have written wrong country name or database is unavailable. Try it again.' });
                    return [2 /*return*/, message.channel.send(embedWrongCountry)];
                }
                else {
                    authorAvatarURL = message.author.avatarURL();
                    dataCountryInfo = data['countryInfo'];
                    iso2 = dataCountryInfo['iso2'];
                    countryEmbed = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setTitle('COVID-19 cases in ' + data['country'] + ' ' + dFormat.createFlagEmoji(iso2))
                        .setAuthor('CoronaBot', coronaLogo)
                        .addFields({ name: "*Here is your data boss* :sunglasses:", value: "**Total cases:** " + dFormat.formatNumber(data['cases']) + "\n                                                                       **Total deaths:** " + dFormat.formatNumber(data['deaths']) + "\n                                                                       **Total recovered:** " + dFormat.formatNumber(data['recovered']) + "\n                                                                       **Total tests:** " + dFormat.formatNumber(data['tests']) + "\n                                                                       **Active cases:** " + dFormat.formatNumber(data['active']) + "\n                                                                       **Critical condition:** " + dFormat.formatNumber(data['critical']) + "\n                                                                       **Today's cases:** " + dFormat.formatNumber(data['todayCases']) + "\n                                                                       **Today's deaths:** " + dFormat.formatNumber(data['todayDeaths']) + "\n                                                                       **Today's recovered:** " + dFormat.formatNumber(data['todayRecovered']) })
                        .setTimestamp()
                        .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, authorAvatarURL);
                    return [2 /*return*/, message.channel.send(countryEmbed)];
                }
                _e.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); });
client.login(token);
