import { Router } from 'express'

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController'

const usersRoutes = Router()

usersRoutes.post('/', new CreateUserController().handle)

export { usersRoutes }
