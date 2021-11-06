import { getRepository, Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  // DTO => Data Transfer Object
  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    })

    await this.repository.save(category)
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name })

    return category
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()

    return categories
  }
}
