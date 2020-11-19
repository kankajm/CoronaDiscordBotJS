"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
var World = /** @class */ (function () {
    function World(total_cases, total_deaths, total_recovered, total_tests, active_cases, critical_cases, today_cases, today_deaths, today_recovered, affected_countries) {
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
    World.prototype.format_number = function (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
    Object.defineProperty(World.prototype, "get_cases", {
        get: function () {
            return this.format_number(this.total_cases);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "get_deaths", {
        get: function () {
            return this.format_number(this.total_deaths);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "get_recovered", {
        get: function () {
            return this.format_number(this.total_recovered);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "get_tests", {
        get: function () {
            return this.format_number(this.total_tests);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "get_active", {
        get: function () {
            return this.format_number(this.active_cases);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "get_critical", {
        get: function () {
            return this.format_number(this.critical_cases);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "get_today_cases", {
        get: function () {
            return this.format_number(this.today_cases);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "get_today_deaths", {
        get: function () {
            return this.format_number(this.today_deaths);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "get_today_recovered", {
        get: function () {
            return this.format_number(this.today_recovered);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "get_affected_countries", {
        get: function () {
            return this.format_number(this.affected_countries);
        },
        enumerable: false,
        configurable: true
    });
    return World;
}());
exports.World = World;
