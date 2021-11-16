import { getRepository, Repository } from 'typeorm'

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO'
import { ICategory } from '@modules/cars/entities/ICategory'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'

import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async findById(category_id: string): Promise<ICategory> {
    const category = await this.repository.findOne(category_id)

    return category
  }

  // DTO => Data Transfer Object
  async create({ description, name }: ICreateCategoryDTO): Promise<ICategory> {
    const category = this.repository.create({
      name,
      description,
    })

    await this.repository.save(category)

    return category
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
