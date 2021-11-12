import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase'

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params
    const images = request.files as Express.Multer.File[]

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

    const images_name = images.map(image => image.filename)

    await uploadCarImagesUseCase.execute({ car_id, images_name })

    return response.status(201).send()
  }
}
