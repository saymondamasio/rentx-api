import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  new CreateCarController().handle
)

carsRoutes.get('/available', new ListAvailableCarsController().handle)

export { carsRoutes }
