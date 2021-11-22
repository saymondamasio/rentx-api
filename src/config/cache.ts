interface ICacheConfig {
  driver: 'redis'

  config: {
    redis: {
      host: string
      port: number
      password: string
    }
  }
}

export const cacheConfig = {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig
