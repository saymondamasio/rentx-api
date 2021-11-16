import 'reflect-metadata'
import cookieParser from 'cookie-parser'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'

import { AppError } from '@shared/errors/AppError'
import 'express-async-errors'

import '@shared/container'
import swaggerConfig from '../../../../swagger.json'
import { createConnectionApplication } from '../typeorm'
import { routes } from './routes'

createConnectionApplication()
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig))

app.use(routes)

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
