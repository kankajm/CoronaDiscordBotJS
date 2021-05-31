function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

function richPresence(serversJoined: number): string {
    let rpcs: string[] = [
      "/help",
      "/invite",
      "/servers"
    ];
    return rpcs[getRandomInt(rpcs.length)];
}

module.exports = { richPresence };