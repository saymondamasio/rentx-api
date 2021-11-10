import { Router } from 'express'

import { authRoutes } from './authenticate.routes'
import { carsRoutes } from './cars.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.use('/categories', categoriesRoutes)
routes.use('/specifications', specificationsRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', authRoutes)
routes.use('/cars', carsRoutes)

export { routes }