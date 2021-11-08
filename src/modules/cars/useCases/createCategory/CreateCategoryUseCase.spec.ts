import { AppError } from '../../../../errors/AppError'
import { CategoriesRepositoryFake } from '../../repositories/fakes/CategoriesRepositoryFake'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryFake: CategoriesRepositoryFake

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryFake = new CategoriesRepositoryFake()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryFake)
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'New Category',
      description: 'New Category Description',
    }

    await createCategoryUseCase.execute(category)

    const categoryCreated = await categoriesRepositoryFake.findByName(
      category.name
    )

    expect(categoryCreated).toHaveProperty('id')
  })

  it('should not be able to create a new category with name exists', async () => {
    const category = {
      name: 'New Category',
      description: 'New Category Description',
    }

    await createCategoryUseCase.execute(category)

    await expect(
      createCategoryUseCase.execute(category)
    ).rejects.toBeInstanceOf(AppError)
  })
})
