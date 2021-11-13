import { Router } from 'express'

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const rentalsRoutes = Router()

rentalsRoutes.post(
  '/',
  ensureAuthenticated,
  new CreateRentalController().handle
)

export { rentalsRoutes }
