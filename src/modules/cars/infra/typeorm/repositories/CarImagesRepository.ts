import { getRepository, Repository } from 'typeorm'

import { ICreateCarImageDTO } from '@modules/cars/dtos/ICreateCarImageDTO'
import { ICarImage } from '@modules/cars/entities/ICarImage'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'

import { CarImage } from '../entities/CarImage'

export class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<ICarImage> {
    const carImage = this.repository.create({ car_id, image_name })

    await this.repository.save(carImage)

    return carImage
  }
}
