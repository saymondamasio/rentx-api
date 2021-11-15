import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { ICar } from '../entities/ICar'

export interface ICarsRepository {
  updateAvailable(id: string, available: boolean): Promise<void>
  save(car: ICar): Promise<ICar>
  findById(id: string): Promise<ICar>
  findAllAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<ICar[]>
  findByLicensePlate(license_plate: string): Promise<ICar>
  create(data: ICreateCarDTO): Promise<ICar>
}
