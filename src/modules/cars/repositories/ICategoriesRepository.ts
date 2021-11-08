import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../infra/typeorm/entities/Category'

export interface ICategoriesRepository {
  list(): Promise<Category[]>
  findByName(name: string): Promise<Category | undefined>
  create(data: ICreateCategoryDTO): Promise<void>
}
