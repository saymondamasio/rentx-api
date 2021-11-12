import { ICategory } from './ICategory'
import { ISpecification } from './ISpecification'

export interface ICar {
  id: string
  name: string
  description: string
  daily_rate: number
  available: boolean
  license_plate: string
  fine_amount: number
  brand: string
  specifications: ISpecification[]
  category: ICategory
  category_id: string
  created_at: Date
  updated_at: Date
}
