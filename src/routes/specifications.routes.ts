import { Router } from 'express'

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'

const specificationsRoutes = Router()

specificationsRoutes.post('/', new CreateSpecificationController().handle)

export { specificationsRoutes }
