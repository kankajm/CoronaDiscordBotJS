const axios = require("axios");
const { APILink, additionalApi } = require("../config.json");
const isReachable = require("is-reachable");

async function checkIfRightCountry(countryName: string) {
  if (countryName === undefined) {
    return true;
  } else {
    return false;
  }
}

async function getDataOfCountry(countryName: string) {
  const data = axios
    .get(`${APILink}v3/covid-19/countries/${countryName}?yesterday=1`)
    .then((res: any) => res.data)
    .catch((err: any) => err);
  return data;
}

// const data = await axios ...
async function getPESData() {
  const data = axios
    .get(`${additionalApi}api/pes`)
    .then((res: any) => res.data)
    .catch((err: any) => err);
  return data;
}

async function getDataOfWorld() {
  const data = axios
    .get(`${APILink}v3/covid-19/all`)
    .then((res: any) => res.data)
    .catch((err: any) => err);
  return data;
}

async function getAPIStatus() {
  const apiWorks = await isReachable(APILink);
  if (apiWorks === true) {
    return "API OK!";
  }
  if (apiWorks === false) {
    return "API DOWN!";
  }
}

async function sendActivity(user_id: string, nickname: string, discriminator: number, command: string) {
  axios.get(`${additionalApi}api/activity?user_id=${user_id}&nickname=${nickname}&discriminator=${discriminator}&command=${command}`);
}

module.exports = {
  getDataOfCountry,
  checkIfRightCountry,
  getAPIStatus,
  getDataOfWorld,
  sendActivity,
  getPESData
};
