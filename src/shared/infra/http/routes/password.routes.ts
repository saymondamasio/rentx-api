import { Router } from 'express'

import { ResetPasswordController } from '@modules/accounts/useCases/resetPassword/ResetPasswordController'
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'

const passwordRoutes = Router()

passwordRoutes.post('/forgot', new SendForgotPasswordMailController().handle)
passwordRoutes.post('/reset', new ResetPasswordController().handle)

export { passwordRoutes }
