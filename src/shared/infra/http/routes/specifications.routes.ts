import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const specificationsRoutes = Router()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  new CreateSpecificationController().handle
)

export { specificationsRoutes }
