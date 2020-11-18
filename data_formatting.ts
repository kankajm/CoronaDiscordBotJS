function createFlagEmoji(country_iso2: string) {
  const iso2ToLower = country_iso2.toLowerCase();
  const flagEmoji = `:flag_${iso2ToLower}:`;
  return flagEmoji;
}

function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function covidInfo() {
  return "The most common symptoms of COVID-19 are fever, tiredness, and dry cough. Some patients may have aches and pains, nasal congestion, runny nose, sore throat or diarrhea. These symptoms are usually mild and begin gradually. Some people become infected but don’t develop any symptoms and don't feel unwell. Most people (about 80%) recover from the disease without needing special treatment. Around 1 out of every 6 people who gets COVID-19 becomes seriously ill and develops difficulty breathing. Older people, and those with underlying medical problems like high blood pressure, heart problems or diabetes, are more likely to develop serious illness. People with fever, cough and difficulty breathing should seek medical attention.";
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getOneRPC(serversJoined: number) {
  let rpcs = [
    ".corona help",
    `Helping on ${serversJoined} servers!`,
    ".corona invite",
  ];
  return rpcs[getRandomInt(3)];
}

module.exports = { createFlagEmoji, formatNumber, covidInfo, getOneRPC };
