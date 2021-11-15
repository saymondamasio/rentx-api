import { v4 as uuid } from 'uuid'

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO'
import { ICategory } from '@modules/cars/entities/ICategory'

import { ICategoriesRepository } from '../ICategoriesRepository'

export class CategoriesRepositoryFake implements ICategoriesRepository {
  categories: ICategory[] = []

  async findById(category_id: string): Promise<ICategory> {
    return this.categories.find(category => category.id === category_id)
  }

  async list(): Promise<ICategory[]> {
    return this.categories
  }

  async findByName(name: string): Promise<ICategory> {
    const category = this.categories.find(category => category.name === name)

    return category
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<ICategory> {
    const category: ICategory = {
      id: uuid(),
      name,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.categories.push(category)

    return category
  }
}
