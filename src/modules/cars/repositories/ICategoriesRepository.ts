import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { ICategory } from '../entities/ICategory'

export interface ICategoriesRepository {
  findById(category_id: string): Promise<ICategory>
  list(): Promise<ICategory[]>
  findByName(name: string): Promise<ICategory | undefined>
  create(data: ICreateCategoryDTO): Promise<ICategory>
}
