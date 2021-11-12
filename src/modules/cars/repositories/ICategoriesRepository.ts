import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { ICategory } from '../entities/ICategory'

export interface ICategoriesRepository {
  list(): Promise<ICategory[]>
  findByName(name: string): Promise<ICategory | undefined>
  create(data: ICreateCategoryDTO): Promise<void>
}
