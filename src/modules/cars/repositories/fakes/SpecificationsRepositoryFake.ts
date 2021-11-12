import { v4 as uuid } from 'uuid'

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO'
import { ISpecification } from '@modules/cars/entities/ISpecification'

import { ISpecificationsRepository } from '../ISpecificationsRepository'

export class SpecificationsRepositoryFake implements ISpecificationsRepository {
  specifications: ISpecification[] = []

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<ISpecification> {
    const specification: ISpecification = {
      id: uuid(),
      description,
      name,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.specifications.push(specification)

    return specification
  }

  async findByName(name: string): Promise<ISpecification> {
    return this.specifications.find(
      specification => specification.name === name
    )
  }
  async findByIds(ids: string[]): Promise<ISpecification[]> {
    const allSpecifications = this.specifications.filter(specification =>
      ids.includes(specification.id)
    )

    return allSpecifications
  }
}
