const axios = require("axios");
const request = require('request');
const cheerio = require('cheerio');
var rp = require('request-promise');
const { APILink } = require("../../config.json");

async function checkIfRightCountry(countryName: string) {
  if (countryName === undefined) {
    return true;
  } else {
    return false;
  }
}

async function getDataOfCountry(countryName: string) {
  const data = axios
    .get(`${APILink}v3/covid-19/countries/${countryName}`)
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

async function APIStatusCode() {
  return await axios
    .get(`${APILink}v3/covid-19/all`)
    .then((res: any) => res.status)
}

async function getVaccinationCountryData(countryName: string) {
  return await axios
  .get(`${APILink}v3/covid-19/vaccine/coverage/countries/${countryName}?lastdays=1`)
  .then((res: any) => res.data)
  .catch((err: any) => err);
}

module.exports = {
  getDataOfCountry,
  checkIfRightCountry,
  getDataOfWorld,
  APIStatusCode,
  getVaccinationCountryData
};
