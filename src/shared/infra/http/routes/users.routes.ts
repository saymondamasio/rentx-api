import { Router } from 'express'
import multer from 'multer'

import { storageConfig } from '@config/storage'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const usersRoutes = Router()

const uploadAvatar = multer(storageConfig.multer(['tmp', 'avatar']))

usersRoutes.post('/', new CreateUserController().handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  new UpdateUserAvatarController().handle
)

export { usersRoutes }
