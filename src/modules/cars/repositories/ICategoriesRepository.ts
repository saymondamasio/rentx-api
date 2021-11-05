import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../entities/Category'

export interface ICategoriesRepository {
  list(): Category[]
  findByName(name: string): Category
  create(data: ICreateCategoryDTO): void
}
