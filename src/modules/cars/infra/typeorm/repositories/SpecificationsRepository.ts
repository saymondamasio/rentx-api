import { getRepository, Repository } from 'typeorm'

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO'
import { ISpecification } from '@modules/cars/entities/ISpecification'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async findByIds(ids: string[]): Promise<ISpecification[]> {
    const specifications = await this.repository.findByIds(ids)

    return specifications
  }

  async findByName(name: string): Promise<ISpecification> {
    const specification = await this.repository.findOne({ name })

    return specification
  }

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<ISpecification> {
    const specification = this.repository.create({
      description,
      name,
    })

    await this.repository.save(specification)

    return specification
  }
}
