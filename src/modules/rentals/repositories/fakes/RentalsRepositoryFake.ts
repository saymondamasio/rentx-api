import { v4 as uuid } from 'uuid'

import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO'
import { IRental } from '@modules/rentals/entities/IRental'

import { IRentalsRepository } from '../IRentalsRepository'

export class RentalsRepositoryFake implements IRentalsRepository {
  private rentals: IRental[] = []

  async findByUser(user_id: string): Promise<IRental[]> {
    return this.rentals.filter(rental => rental.user_id === user_id)
  }

  async save(rental: IRental): Promise<IRental> {
    const findIndex = this.rentals.findIndex(
      findRental => findRental.id === rental.id
    )

    this.rentals[findIndex] = rental

    return rental
  }

  async findById(id: string): Promise<IRental> {
    return this.rentals.find(rental => rental.id === id)
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<IRental> {
    const rental: IRental = {
      id: uuid(),
      car_id,
      expected_return_date: new Date(expected_return_date),
      user_id,
      start_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.rentals.push(rental)

    return rental
  }
  async findOpenRentalByCar(id: string): Promise<IRental> {
    return this.rentals.find(rental => rental.car_id === id && !rental.end_date)
  }
  async findOpenRentalByUser(id: string): Promise<IRental> {
    return this.rentals.find(
      rental => rental.user_id === id && !rental.end_date
    )
  }
}
