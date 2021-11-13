import { ICreateRentalDTO } from '../dto/ICreateRentalDTO'
import { IRental } from '../entities/IRental'

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<IRental>
  findOpenRentalByCar(car_id: string): Promise<IRental>
  findOpenRentalByUser(user_id: string): Promise<IRental>
}
