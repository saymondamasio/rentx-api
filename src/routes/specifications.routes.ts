import { response, Router } from 'express'

import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'

const specificationsRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository
  )

  try {
    createSpecificationService.execute({
      name,
      description,
    })
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }

  return response.status(201).send()
})

export { specificationsRoutes }
