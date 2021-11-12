import { inject, injectable } from 'tsyringe'

import { ICar } from '@modules/cars/entities/ICar'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  car_id: string
  specifications_id: string[]
}
@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<ICar> {
    const carExists = await this.carsRepository.findById(car_id)

    if (!carExists) {
      throw new AppError('Car not found')
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    )

    carExists.specifications = specifications

    const carUpdated = await this.carsRepository.save(carExists)

    return carUpdated
  }
}
