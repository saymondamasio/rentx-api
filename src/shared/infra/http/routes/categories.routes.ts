import { Router } from 'express'
import multer from 'multer'

import { storageConfig } from '@config/storage'
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const categoriesRoutes = Router()

const upload = multer(storageConfig.upload.multer)

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  new CreateCategoryController().handle
)

categoriesRoutes.get('/', new ListCategoriesController().handle)

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  new ImportCategoryController().handle
)

export { categoriesRoutes }
