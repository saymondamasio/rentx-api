import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'
import 'express-async-errors'

import './shared/container'
import './database'

import swaggerConfig from '../swagger.json'
import { AppError } from './errors/AppError'
import { routes } from './routes'

const app = express()

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

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
