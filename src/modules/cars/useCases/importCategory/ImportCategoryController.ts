import { Request, Response } from 'express'

import { ImportCategoryUseCase } from './ImportCategoryUseCase'

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const file = request.file

    this.importCategoryUseCase.execute(file)

    return response.json({
      message: 'ok',
    })
  }
}
