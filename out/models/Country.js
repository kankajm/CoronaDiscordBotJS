"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
class Country {
    constructor(country_name, iso2, country_continent, total_cases, total_tests, critical_cases, total_deaths, total_recovered, total_active_cases, today_cases, today_deaths, today_recovered) {
        this.country_name = country_name;
        this.iso2 = iso2;
        this.country_continent = country_continent;
        this.total_cases = total_cases;
        this.total_tests = total_tests;
        this.critical_cases = critical_cases;
        this.total_deaths = total_deaths;
        this.total_recovered = total_recovered;
        this.total_active_cases = total_active_cases;
        this.today_cases = today_cases;
        this.today_deaths = today_deaths;
        this.today_recovered = today_recovered;
    }
    static format_number(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    get get_name() {
        return this.country_name;
    }
    get get_flag_emoji() {
        const iso2_to_lower = this.iso2.toLowerCase();
        const flag_emoji = `:flag_${iso2_to_lower}:`;
        return flag_emoji;
    }
    get get_continent() {
        return this.country_continent;
    }
    get get_cases() {
        return Country.format_number(this.total_cases);
    }
    get get_tests() {
        return Country.format_number(this.total_tests);
    }
    get get_critical_cases() {
        return Country.format_number(this.critical_cases);
    }
    get get_deaths() {
        return Country.format_number(this.total_deaths);
    }
    get get_recovered() {
        return Country.format_number(this.total_recovered);
    }
    get get_active_cases() {
        return Country.format_number(this.total_active_cases);
    }
    get get_today_cases() {
        return Country.format_number(this.today_cases);
    }
    get get_today_deaths() {
        return Country.format_number(this.today_deaths);
    }
    get get_today_recovered() {
        return Country.format_number(this.today_recovered);
    }
}
exports.Country = Country;
