export class Country {
    country_name: string;
    iso2: string;
    country_continent: string;
    total_cases: number;
    total_tests: number;
    critical_cases: number;
    total_deaths: number;
    total_recovered: number;
    total_active_cases: number;
    today_cases: number;
    today_deaths: number;
    today_recovered: number;

    constructor(country_name: string, iso2: string, country_continent: string, total_cases: number, total_tests: number, critical_cases: number,
        total_deaths: number, total_recovered: number, total_active_cases: number, today_cases: number, today_deaths: number, today_recovered: number) {
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

    private format_number(num: number): string {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    get get_name(): string {
        return this.country_name;
    }

    get get_flag_emoji(): string {
        const iso2_to_lower = this.iso2.toLowerCase();
        const flag_emoji = `:flag_${iso2_to_lower}:`;
        return flag_emoji;
    }

    get get_continent(): string {
        return this.country_continent;
    }

    get get_cases(): string {
        return this.format_number(this.total_cases);
    }

    get get_tests(): string {
        return this.format_number(this.total_tests);
    }

    get get_critical_cases(): string {
        return this.format_number(this.critical_cases);
    }

    get get_deaths(): string {
        return this.format_number(this.total_deaths);
    }

    get get_recovered(): string {
        return this.format_number(this.total_recovered);
    }

    get get_active_cases(): string {
        return this.format_number(this.total_active_cases);
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
}