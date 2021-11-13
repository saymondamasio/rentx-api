import { ICreateRentalDTO } from '../dto/ICreateRentalDTO'
import { IRental } from '../entities/IRental'

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<IRental>
  findOpenRentalByCar(id: string): Promise<IRental>
  findOpenRentalByUser(id: string): Promise<IRental>
}
