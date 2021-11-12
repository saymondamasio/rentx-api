import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO'
import { ISpecification } from '../entities/ISpecification'

export interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<ISpecification>
  findByName(name: string): Promise<ISpecification>
  findByIds(ids: string[]): Promise<ISpecification[]>
}
