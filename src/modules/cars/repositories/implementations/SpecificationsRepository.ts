import { v4 as uuid } from 'uuid'

import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO'
import { Specification } from '../../entities/Specification'
import { ISpecificationsRepository } from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  private static INSTANCE: SpecificationsRepository

  private constructor() {
    this.specifications = []
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository()
    }

    return SpecificationsRepository.INSTANCE
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
