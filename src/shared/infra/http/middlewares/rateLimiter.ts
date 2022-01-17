import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { createClient } from 'redis'

import { cacheConfig } from '@config/cache'
import { AppError } from '@shared/errors/AppError'

const redisClient = createClient({
  url: `redis://${cacheConfig.config.redis.host}:${cacheConfig.config.redis.port}`,
  password: cacheConfig.config.redis.password,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 5,
  duration: 1,
})

redisClient.on('error', function (err) {
  console.log('Error ' + err)
})

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(req.ip)

    return next()
  } catch {
    throw new AppError('Too many requests', 429)
  }
}
