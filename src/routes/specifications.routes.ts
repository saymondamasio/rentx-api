import { Router } from 'express'
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'

const specificationsRoutes = Router()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  new CreateSpecificationController().handle
)

export { specificationsRoutes }
