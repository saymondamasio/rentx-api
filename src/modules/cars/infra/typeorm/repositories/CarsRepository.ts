import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICar } from '@modules/cars/entities/ICar'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car } from '../entities/Car'

export class CarsRepository implements ICarsRepository {
  private repository: Repository<ICar>

  constructor() {
    this.repository = getRepository(Car)
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id', { id })
      .execute()
  }

  async save(car: ICar): Promise<ICar> {
    return await this.repository.save(car)
  }

  async findById(id: string): Promise<ICar> {
    const car = await this.repository.findOne(id)

    return car
  }

  async findAllAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<ICar[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('car')
      .where('available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere('car.brand = :brand', { brand })
    }

    if (name) {
      carsQuery.andWhere('car.name = :name', { name })
    }

    if (category_id) {
      carsQuery.andWhere('car.category_id = :category_id', { category_id })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async findByLicensePlate(license_plate: string): Promise<ICar> {
    const car = await this.repository.findOne({ license_plate })

    return car
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<ICar> {
    const car = await this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    })

    this.repository.save(car)

    return car
  }
}
