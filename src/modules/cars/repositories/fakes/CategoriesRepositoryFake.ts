import { v4 as uuid } from 'uuid'

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO'
import { Category } from '@modules/cars/entities/Category'

import { ICategoriesRepository } from '../ICategoriesRepository'

export class CategoriesRepositoryFake implements ICategoriesRepository {
  categories: Category[] = []

  async list(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name)

    return category
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category: Category = {
      id: uuid(),
      name,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.categories.push(category)
  }
}
