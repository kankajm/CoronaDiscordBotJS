const axios = require('axios');
const { APILink, APILinkWorld } = require('./config.json');
const isReachable = require('is-reachable');

async function checkIfRightCountry(countryName) {
    if (countryName === undefined) {
        return true
    } else {
        return false
    }
}

async function getDataOfCountry(countryName) {
    const data = axios.get(`${APILink}v2/countries/${countryName}`)
                .then(res => res.data)
                .catch(err => err)
    return data
}

async function getDataOfWorld() {
    const data = axios.get(`${APILink}v2/all`)
                .then(res => res.data)
                .catch(err => err)
    return data
}

async function getAPIStatus() {
    const apiWorks = await isReachable(APILink)
    if (apiWorks === true) {
        return 'API OK!'
    }
    if (apiWorks === false) {
        return 'API DOWN!'
    }
}

module.exports = { getDataOfCountry, checkIfRightCountry, getAPIStatus, getDataOfWorld }