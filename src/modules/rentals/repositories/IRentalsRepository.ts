import { ICreateRentalDTO } from '../dto/ICreateRentalDTO'
import { IRental } from '../entities/IRental'

export interface IRentalsRepository {
  findByUser(user_id: string): Promise<IRental[]>
  save(rental: IRental): Promise<IRental>
  findById(id: string): Promise<IRental>
  create(data: ICreateRentalDTO): Promise<IRental>
  findOpenRentalByCar(car_id: string): Promise<IRental>
  findOpenRentalByUser(user_id: string): Promise<IRental>
}
