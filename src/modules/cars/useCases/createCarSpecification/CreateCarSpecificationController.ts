import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

export class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params
    const { specifications_id } = request.body

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    )

    const carUpdated = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    })

    return response.json(instanceToInstance(carUpdated))
  }
}
