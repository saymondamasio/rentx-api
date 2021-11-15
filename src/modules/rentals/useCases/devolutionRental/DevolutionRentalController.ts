import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase'

export class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request
    const { id } = request.params

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

    const rentalUpdated = await devolutionRentalUseCase.execute({ id, user_id })

    return response.json(rentalUpdated)
  }
}
