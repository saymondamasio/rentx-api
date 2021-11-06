import express from 'express'
import swaggerUI from 'swagger-ui-express'

import swaggerConfig from '../swagger.json'
import { routes } from './routes'

const app = express()

app.use(express.json())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig))

app.use(routes)

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
