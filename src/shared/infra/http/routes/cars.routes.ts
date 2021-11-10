import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  new CreateCarController().handle
)

export { carsRoutes }
