import 'reflect-metadata'
import 'dotenv/config'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { resolve } from 'path'
import swaggerUI from 'swagger-ui-express'

import { storageConfig } from '@config/storage'
import { AppError } from '@shared/errors/AppError'

import 'express-async-errors'

import '@shared/container'

import swaggerConfig from '../../../../swagger.json'
import { createConnectionsApplication } from '../typeorm'
import { routes } from './routes'

createConnectionsApplication()
const app = express()

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
