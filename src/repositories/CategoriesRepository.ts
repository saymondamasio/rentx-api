import { v4 as uuid } from 'uuid'

import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../models/Category'

export class CategoriesRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
  }

  // DTO => Data Transfer Object
  create({ description, name }: ICreateCategoryDTO): void {
    const category = {
      id: uuid(),
      name,
      description,
      created_at: new Date(),
    }

    this.categories.push(category)
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find(category => category.name === name)

    return category
  }

  list(): Category[] {
    return this.categories
  }
}
