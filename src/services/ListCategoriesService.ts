import { Category } from '../models/Category'
import { CategoriesRepository } from '../repositories/CategoriesRepository'

export class ListCategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.list()
  }
}
