"use strict";
const axios = require("axios");
const request = require('request');
const cheerio = require('cheerio');
var rp = require('request-promise');
const { APILink } = require("../../config.json");
async function checkIfRightCountry(countryName) {
    if (countryName === undefined) {
        return true;
    }
    else {
        return false;
    }
}
async function getDataOfCountry(countryName) {
    const data = axios
        .get(`${APILink}v3/covid-19/countries/${countryName}`)
        .then((res) => res.data)
        .catch((err) => err);
    return data;
}
async function getDataOfWorld() {
    const data = axios
        .get(`${APILink}v3/covid-19/all`)
        .then((res) => res.data)
        .catch((err) => err);
    return data;
}
async function APIStatusCode() {
    return await axios
        .get(`${APILink}v3/covid-19/all`)
        .then((res) => res.status);
}
async function getVaccinationCountryData(countryName) {
    return await axios
        .get(`${APILink}v3/covid-19/vaccine/coverage/countries/${countryName}?lastdays=1`)
        .then((res) => res.data)
        .catch((err) => err);
}
function scrapePESNumber() {
    const pesNum = rp('https://onemocneni-aktualne.mzcr.cz/pes')
        .then(function (htmlString) {
        const $ = cheerio.load(htmlString);
        const siteHeading = $('span#pes-current-degree');
        return siteHeading.contents().first().text()[7];
    });
    return pesNum;
}
module.exports = {
    getDataOfCountry,
    checkIfRightCountry,
    getDataOfWorld,
    scrapePESNumber,
    APIStatusCode,
    getVaccinationCountryData
};
