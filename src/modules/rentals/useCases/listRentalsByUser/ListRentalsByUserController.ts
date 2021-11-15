import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase'

export class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request

    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)

    const rentals = await listRentalsByUserUseCase.execute(user_id)

    return response.json(rentals)
  }
}
