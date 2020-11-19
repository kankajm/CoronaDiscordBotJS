export class World {
    total_cases: number;
    total_deaths: number;
    total_recovered: number;
    total_tests: number;
    active_cases: number;
    critical_cases: number;
    today_cases: number;
    today_deaths: number;
    today_recovered: number;
    affected_countries: number;

    constructor(total_cases: number, total_deaths: number, total_recovered: number, total_tests: number, active_cases: number,
        critical_cases: number, today_cases: number, today_deaths: number, today_recovered: number, affected_countries: number) {
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

    private format_number(num: number): string {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    get get_cases(): string {
        return this.format_number(this.total_cases);
    }

    get get_deaths(): string {
        return this.format_number(this.total_deaths);
    }

    get get_recovered(): string {
        return this.format_number(this.total_recovered);
    }

    get get_tests(): string {
        return this.format_number(this.total_tests);
    }

    get get_active(): string {
        return this.format_number(this.active_cases);
    }

    get get_critical(): string {
        return this.format_number(this.critical_cases);
    }

    get get_today_cases(): string {
        return this.format_number(this.today_cases);
    }

    get get_today_deaths(): string {
        return this.format_number(this.today_deaths);
    }

    get get_today_recovered(): string {
        return this.format_number(this.today_recovered);
    }

    get get_affected_countries(): string {
        return this.format_number(this.affected_countries);
    }
}