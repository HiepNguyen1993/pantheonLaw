/**
 * Define the Api configuration
 * @interface ApiConfig
 */
interface ApiConfig {
    host: string;
    prefix: string;
    url(): string;
    // tslint:disable-next-line:member-ordering
    cache: boolean;
}

const config: ApiConfig = {
    host: 'http://localhost:5000',
    prefix: 'api',
    url: () => `${config.host}/${config.prefix}`,
    cache: true
};

export const ApiConfig = config;
