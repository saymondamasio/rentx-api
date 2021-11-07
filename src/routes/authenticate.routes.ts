import { Router } from 'express'

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController'

const authRoutes = Router()

authRoutes.post('/', new AuthenticateUserController().handle)

export { authRoutes }
