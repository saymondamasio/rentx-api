import { inject, injectable } from 'tsyringe'

import { ICar } from '@modules/cars/entities/ICar'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: IRequest): Promise<ICar> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    )

    const categoryExists = await this.categoriesRepository.findById(category_id)

    if (carAlreadyExists) {
      throw new AppError('Car already exists')
    }

    if (!categoryExists) {
      throw new AppError('Category not exists')
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    })

    return car
  }
}
