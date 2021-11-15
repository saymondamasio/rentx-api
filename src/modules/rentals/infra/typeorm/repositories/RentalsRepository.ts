import { getRepository, IsNull, Repository } from 'typeorm'

import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO'
import { IRental } from '@modules/rentals/entities/IRental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<IRental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findByUser(user_id: string): Promise<IRental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    })

    return rentals
  }

  async save(rental: IRental): Promise<IRental> {
    const rentalSaved = await this.repository.save(rental)

    return rentalSaved
  }

  async findById(id: string): Promise<IRental> {
    const rental = this.repository.findOne(id)

    return rental
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<IRental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    })

    await this.repository.save(rental)

    return rental
  }
  async findOpenRentalByCar(car_id: string): Promise<IRental> {
    const rentalOpenByCar = await this.repository.findOne({
      car_id,
      end_date: null,
    })

    return rentalOpenByCar
  }
  async findOpenRentalByUser(user_id: string): Promise<IRental> {
    const rentalOpenByUser = await this.repository.findOne({
      user_id,
      end_date: null,
    })

    return rentalOpenByUser
  }
}
