import { Router } from 'express'
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload(['tmp', 'avatar']))

usersRoutes.post('/', new CreateUserController().handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  new UpdateUserAvatarController().handle
)

export { usersRoutes }
