module.exports = {
  name: 'default',
  type: 'postgres',
  url: process.env.DATABASE_URL || null,
  host: process.env.NODE_ENV === 'production' ? null : process.env.PG_HOST,
  port: process.env.NODE_ENV === 'production' ? null : process.env.PG_PORT,
  username: process.env.NODE_ENV === 'production' ? null : process.env.PG_USERNAME,
  password: process.env.NODE_ENV === 'production' ? null : process.env.PG_PASSWORD,
  database: process.env.NODE_ENV === 'production' ? null : process.env.PG_DATABASE,
  logging: process.env.NODE_ENV !== 'production',
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
  entities: [
    process.env.NODE_ENV === 'production'
      ? 'dist/modules/**/infra/Typeorm/entities/*.js'
      : './src/modules/**/infra/Typeorm/entities/*.ts',
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/shared/infra/Typeorm/migrations/*.js'
      : './src/shared/infra/Typeorm/migrations/*.ts',
  ],
  cli: {
    migrationsDir: './src/shared/infra/Typeorm/migrations',
  },
};
