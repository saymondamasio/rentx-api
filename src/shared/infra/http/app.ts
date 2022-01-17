import '@shared/container'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { resolve } from 'path'
import swaggerUI from 'swagger-ui-express'

import { storageConfig } from '@config/storage'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { AppError } from '@shared/errors/AppError'

import swaggerConfig from '../../../../swagger.json'
import '../typeorm'
import { rateLimiter } from './middlewares/rateLimiter'
import { routes } from './routes'

const app = express()

app.use(rateLimiter)

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
})
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(
  cors({
    origin: [`${process.env.APP_WEB_URL}`],
    credentials: true,
  })
)

app.use(
  '/avatar',
  express.static(resolve(storageConfig.uploadFolder, 'avatar'))
)
app.use('/cars', express.static(resolve(storageConfig.uploadFolder, 'cars')))

app.use(cookieParser())
app.use(express.json())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig))

app.use(routes)

app.use(Sentry.Handlers.errorHandler())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal error server - ${err.message}`,
  })
})

export { app }
