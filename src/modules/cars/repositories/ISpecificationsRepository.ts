import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO'
import { Specification } from '../entities/Specification'

export interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): void
  findByName(name: string): Specification
}
