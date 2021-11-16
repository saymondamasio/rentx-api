import { inject, injectable } from 'tsyringe'

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.forEach(async image_name => {
      await this.carImagesRepository.create({ car_id, image_name })
      await this.storageProvider.saveFile(image_name, 'cars')
    })
  }
}
