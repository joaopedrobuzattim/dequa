/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: number;
    NODE_ENV?: string;
    APP_SECRET?: string;
    PROD_STORAGE_DRIVER?: string;
    PG_HOST?: string;
    PG_USERNAME?: string;
    PG_PASSWORD?: string;
    PG_DATABASE?: string;
    PG_PORT?: number;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
  }
}
