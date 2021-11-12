import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '@config/upload'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

const uploadImages = multer(uploadConfig.upload(['tmp', 'cars']))

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  new CreateCarController().handle
)

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  new CreateCarSpecificationController().handle
)

carsRoutes.get('/available', new ListAvailableCarsController().handle)

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array('images'),
  new UploadCarImagesController().handle
)

export { carsRoutes }
