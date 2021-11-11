import { v4 as uuid } from 'uuid'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICar } from '@modules/cars/entities/ICar'

import { ICarsRepository } from '../ICarsRepository'

export class CarsRepositoryFake implements ICarsRepository {
  private cars: ICar[] = []

  async findAllAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<ICar[]> {
    const carsAvailable = this.cars.filter(car => car.available)

    if (name || brand || category_id) {
      return carsAvailable.filter(
        car =>
          car.name === name ||
          car.brand === brand ||
          car.category_id === category_id
      )
    }

    return carsAvailable
  }

  async findByLicensePlate(license_plate: string): Promise<ICar> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<ICar> {
    const car: ICar = {
      id: uuid(),
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      available: true,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.cars.push(car)

    return car
  }
}
