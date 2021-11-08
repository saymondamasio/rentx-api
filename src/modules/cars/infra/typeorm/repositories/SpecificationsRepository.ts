import { getRepository, Repository } from 'typeorm'

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name })

    return specification
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    })

    await this.repository.save(specification)
  }
}
