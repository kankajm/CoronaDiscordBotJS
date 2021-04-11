"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
class World {
    constructor(total_cases, total_deaths, total_recovered, total_tests, active_cases, critical_cases, today_cases, today_deaths, today_recovered, affected_countries) {
        this.total_cases = total_cases;
        this.total_deaths = total_deaths;
        this.total_recovered = total_recovered;
        this.total_tests = total_tests;
        this.active_cases = active_cases;
        this.critical_cases = critical_cases;
        this.today_cases = today_cases;
        this.today_deaths = today_deaths;
        this.today_recovered = today_recovered;
        this.affected_countries = affected_countries;
    }
    format_number(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    get get_cases() {
        return this.format_number(this.total_cases);
    }
    get get_deaths() {
        return this.format_number(this.total_deaths);
    }
    get get_recovered() {
        return this.format_number(this.total_recovered);
    }
    get get_tests() {
        return this.format_number(this.total_tests);
    }
    get get_active() {
        return this.format_number(this.active_cases);
    }
    get get_critical() {
        return this.format_number(this.critical_cases);
    }
    get get_today_cases() {
        return this.format_number(this.today_cases);
    }
    get get_today_deaths() {
        return this.format_number(this.today_deaths);
    }
    get get_today_recovered() {
        return this.format_number(this.today_recovered);
    }
    get get_affected_countries() {
        return this.format_number(this.affected_countries);
    }
}
exports.World = World;
