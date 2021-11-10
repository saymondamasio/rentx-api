import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'

const carsRoutes = Router()

carsRoutes.post('/', new CreateCarController().handle)

export { carsRoutes }
