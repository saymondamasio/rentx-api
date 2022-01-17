export default [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    uuidExtension: 'pgcrypto',
    cache: true,
    ssl: true,

    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    entities: ['./src/modules/**/entities/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
      entitiesDir: './src/modules/**/entities',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_NAME,
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  },
]
