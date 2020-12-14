function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

function richPresence(serversJoined: number): string {
    let rpcs: string[] = [
      ".corona help",
      `Helping on ${serversJoined} servers!`,
      ".corona invite",
      "corona-bot.eu",
    ];
    return rpcs[getRandomInt(rpcs.length)];
}

module.exports = { richPresence };