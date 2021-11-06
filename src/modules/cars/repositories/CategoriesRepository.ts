import { v4 as uuid } from 'uuid'

import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../entities/Category'
import { ICategoriesRepository } from './ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    return CategoriesRepository.INSTANCE
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
