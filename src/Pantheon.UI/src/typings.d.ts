/* SystemJS module definition */
declare var module: NodeModule;
interface ApiConfig {
  host: string;
  prefix: string,
  cache: boolean,
  cacheLanguage: boolean
}
interface NodeModule {
  id: string;
}

declare var require: any;

declare var $: any;
declare var jQuery:any;
declare var _: any;
declare var __appConfig__: ApiConfig;
declare var google: any;