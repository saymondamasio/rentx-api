import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { ICar } from '../entities/ICar'

export interface ICarsRepository {
  findAllAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<ICar[]>
  findByLicensePlate(license_plate: string): Promise<ICar>
  create(data: ICreateCarDTO): Promise<ICar>
}
