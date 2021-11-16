import { Router } from 'express'

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController'
import { RevokeTokenController } from '@modules/accounts/useCases/revokeToken/RevokeTokenController'

const authRoutes = Router()

authRoutes.post('/', new AuthenticateUserController().handle)

authRoutes.post('/refresh-token', new RefreshTokenController().handle)

authRoutes.delete('/revoke', new RevokeTokenController().handle)

export { authRoutes }
