interface ICacheConfig {
  driver: 'redis'

  config: {
    redis: {
      url: string
    }
  }
}

export const cacheConfig = {
  driver: 'redis',
  config: {
    redis: {
      url: process.env.REDIS_URL,
    },
  },
} as ICacheConfig
