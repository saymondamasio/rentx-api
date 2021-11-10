import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { ICar } from '../entities/ICar'

export interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<ICar>
  create(data: ICreateCarDTO): Promise<ICar>
}
