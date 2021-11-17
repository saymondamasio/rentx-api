import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  driver: 'redis'

  config: {
    redis: RedisOptions
  }
}

export const cacheConfig = {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  },
} as ICacheConfig
