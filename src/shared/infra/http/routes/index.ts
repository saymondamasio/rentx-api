import { Router } from 'express'

import { authRoutes } from './authenticate.routes'
import { carsRoutes } from './cars.routes'
import { categoriesRoutes } from './categories.routes'
import { passwordRoutes } from './password.routes'
import { rentalsRoutes } from './rentals.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.use('/categories', categoriesRoutes)
routes.use('/specifications', specificationsRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', authRoutes)
routes.use('/cars', carsRoutes)
routes.use('/rentals', rentalsRoutes)
routes.use('/password', passwordRoutes)

export { routes }
