import { inject, injectable } from 'tsyringe'

import { ICar } from '@modules/cars/entities/ICar'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

interface IRequest {
  name?: string
  brand?: string
  category_id?: string
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository
  ) {}

  async execute({ brand, category_id, name }: IRequest): Promise<ICar[]> {
    const cars = await this.carsRepository.findAllAvailable(
      name,
      brand,
      category_id
    )

    return cars
  }
}
