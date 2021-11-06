import { getRepository, Repository } from 'typeorm'

import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO'
import { Specification } from '../../entities/Specification'
import { ISpecificationsRepository } from '../ISpecificationsRepository'

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
