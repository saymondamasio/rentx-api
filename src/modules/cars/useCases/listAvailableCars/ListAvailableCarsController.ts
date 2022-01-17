import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

export class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string,
    })

    return response.json(instanceToInstance(cars))
  }
}
