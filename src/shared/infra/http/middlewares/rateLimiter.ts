import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { createClient } from 'redis'

import { cacheConfig } from '@config/cache'
import { AppError } from '@shared/errors/AppError'

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const redisClient = createClient({
    legacyMode: true,
    url: `redis://${cacheConfig.config.redis.host}:${cacheConfig.config.redis.port}`,
    password: cacheConfig.config.redis.password,
    socket: {
      host: cacheConfig.config.redis.host,
      port: cacheConfig.config.redis.port,
      tls: true,
      rejectUnauthorized: false,
    },
  })

  await redisClient.connect()

  redisClient.on('error', err => console.log(`${err.name}: ${err.message}`))

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rate-limit',
    points: 20,
    duration: 5,
    blockDuration: 10,
  })
  try {
    await limiter.consume(req.ip)

    return next()
  } catch (rateLimiterRes) {
    req.headers['Retry-After'] = String(rateLimiterRes.msBeforeNext / 1000)
    req.headers['X-RateLimit-Limit'] = String(20)
    req.headers['X-RateLimit-Remaining'] = String(
      rateLimiterRes.remainingPoints
    )
    req.headers['X-RateLimit-Reset'] = new Date(
      Date.now() + rateLimiterRes.msBeforeNext
    ).toString()
    throw new AppError('Too many requests', 429)
  }
}
