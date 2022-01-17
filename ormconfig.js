require('dotenv/config')

const devConfig = [
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
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },

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
    url: process.env.MONGO_URL,
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/schemas/*.ts'],
  },
]

const prodConfig = [
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
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },

    entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
    migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
    cli: {
      migrationsDir: './dist/shared/infra/typeorm/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    url: process.env.MONGO_URL,
    useUnifiedTopology: true,
    entities: ['./dist/modules/**/infra/schemas/*.js'],
  },
]

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
