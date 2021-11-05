import { Category } from '../models/Category'
import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

export class ListCategoriesService {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  execute(): Category[] {
    return this.categoriesRepository.list()
  }
}
