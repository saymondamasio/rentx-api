import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { createClient } from 'redis'

import { cacheConfig } from '@config/cache'
import { AppError } from '@shared/errors/AppError'

let isConnected = false

const redisClient = createClient({
  legacyMode: true,
  url: cacheConfig.config.redis.url,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10, // 10 requests
  duration: 1, // por 1 second, by IP
})

redisClient.on('connect', () => {
  console.log('connected redis')
  isConnected = true
})
redisClient.on('end', () => {
  console.log('disconnected redis')
  isConnected = false
})
redisClient.on('reconnecting', () => {
  console.log('reconnecting redis')
})
redisClient.on('error', err => {
  console.log('error redis', { err })
})

export async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  if (!isConnected) {
    await redisClient.connect()
  }

  try {
    await limiter.consume(request.ip)

    next()
  } catch (error) {
    console.log(error)

    throw new AppError('Too many requests', 429)
  }
}
