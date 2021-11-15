import { inject, injectable } from 'tsyringe'

import { IRental } from '@modules/rentals/entities/IRental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string): Promise<IRental[]> {
    const rentals = await this.rentalsRepository.findByUser(user_id)

    return rentals
  }
}
