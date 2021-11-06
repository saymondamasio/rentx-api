import { Request, Response } from 'express'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    try {
      await this.createCategoryUseCase.execute({
        name,
        description,
      })
    } catch (error) {
      return response.status(400).json({ error: 'Category already exists' })
    }

    return response.status(201).send()
  }
}
