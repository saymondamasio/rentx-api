import { v4 as uuid } from 'uuid'

import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO'
import { Specification } from '../entities/Specification'
import { ISpecificationsRepository } from './ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      specification => specification.name === name
    )

    return specification
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const specification: Specification = {
      id: uuid(),
      name,
      description,
      created_at: new Date(),
    }

    this.specifications.push(specification)
  }
}
