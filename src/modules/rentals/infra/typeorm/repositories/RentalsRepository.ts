import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO'
import { IRental } from '@modules/rentals/entities/IRental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

export class RentalsRepository implements IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<IRental> {
    throw new Error('Method not implemented.')
  }
  findOpenRentalByCar(id: string): Promise<IRental> {
    throw new Error('Method not implemented.')
  }
  findOpenRentalByUser(id: string): Promise<IRental> {
    throw new Error('Method not implemented.')
  }
}
