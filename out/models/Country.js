"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
var Country = /** @class */ (function () {
    function Country(country_name, iso2, country_continent, total_cases, total_tests, critical_cases, total_deaths, total_recovered, total_active_cases, today_cases, today_deaths, today_recovered) {
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
    Country.prototype.format_number = function (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
    Object.defineProperty(Country.prototype, "get_name", {
        get: function () {
            return this.country_name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_flag_emoji", {
        get: function () {
            var iso2_to_lower = this.iso2.toLowerCase();
            var flag_emoji = ":flag_" + iso2_to_lower + ":";
            return flag_emoji;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_continent", {
        get: function () {
            return this.country_continent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_cases", {
        get: function () {
            return this.format_number(this.total_cases);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_tests", {
        get: function () {
            return this.format_number(this.total_tests);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_critical_cases", {
        get: function () {
            return this.format_number(this.critical_cases);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_deaths", {
        get: function () {
            return this.format_number(this.total_deaths);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_recovered", {
        get: function () {
            return this.format_number(this.total_recovered);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_active_cases", {
        get: function () {
            return this.format_number(this.total_active_cases);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_today_cases", {
        get: function () {
            return this.format_number(this.today_cases);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_today_deaths", {
        get: function () {
            return this.format_number(this.today_deaths);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "get_today_recovered", {
        get: function () {
            return this.format_number(this.today_recovered);
        },
        enumerable: false,
        configurable: true
    });
    return Country;
}());
exports.Country = Country;
