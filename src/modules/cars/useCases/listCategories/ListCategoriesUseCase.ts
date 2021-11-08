import { inject, injectable } from 'tsyringe'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    return await this.categoriesRepository.list()
  }
}
