/**
 * Define the Api configuration
 * @interface ApiConfig
 */
interface ApiConfig {
    host: string;
    prefix: string;
    url(): string;
}

const config: ApiConfig = {
    host: __appConfig__.host,
    prefix: __appConfig__.prefix || 'api',
    url: () => `${config.host}/${config.prefix}`
};

export const ApiConfig = config;
