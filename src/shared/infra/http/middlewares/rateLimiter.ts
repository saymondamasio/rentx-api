import rateLimit from 'express-rate-limit'
import Redis from 'ioredis'
import RedisStore from 'rate-limit-redis'

import { cacheConfig } from '@config/cache'

// const client = createClient({
//   legacyMode: true,
//   url: cacheConfig.config.redis.url,
//   socket: {
//     tls: true,
//     rejectUnauthorized: false,
//     connectTimeout: 5000,
//   },
// })

// client.connect()

const client = new Redis(cacheConfig.config.redis.url, {
  tls: {
    rejectUnauthorized: false,
  },
})

console.log(cacheConfig.config.redis.url)

export const rateLimiter = rateLimit({
  // Rate limiter configuration
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 50, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

  // Redis store configuration
  store: new RedisStore({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    sendCommand: (...args: string[]) => client.call(...args),
  }),
  skipFailedRequests: true,
  handler: function (req, res /* next */) {
    return res.status(429).json({
      error: 'You sent too many requests. Please wait a while then try again',
    })
  },
})
