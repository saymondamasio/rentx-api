import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake'
import { CategoriesRepositoryFake } from '@modules/cars/repositories/fakes/CategoriesRepositoryFake'
import { AppError } from '@shared/errors/AppError'

import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepository: CarsRepositoryFake
let categoriesRepository: CategoriesRepositoryFake

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryFake()
    categoriesRepository = new CategoriesRepositoryFake()
    createCarUseCase = new CreateCarUseCase(
      carsRepository,
      categoriesRepository
    )
  })

  it('should be able to create car', async () => {
    const category = await categoriesRepository.create({
      description: 'Carros',
      name: 'Carros',
    })

    const car = await createCarUseCase.execute({
      name: 'Name car',
      brand: 'Brand car',
      category_id: category.id,
      daily_rate: 100,
      description: 'description',
      fine_amount: 50,
      license_plate: 'ABC-1234',
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with exists license plate', async () => {
    const category = await categoriesRepository.create({
      description: 'Carros',
      name: 'Carros',
    })

    await createCarUseCase.execute({
      name: 'Name car',
      brand: 'Brand car',
      category_id: category.id,
      daily_rate: 100,
      description: 'description',
      fine_amount: 50,
      license_plate: 'ABC-1234',
    })

    await expect(
      createCarUseCase.execute({
        name: 'Name car 2',
        brand: 'Brand car',
        category_id: category.id,
        daily_rate: 100,
        description: 'description',
        fine_amount: 50,
        license_plate: 'ABC-1234',
      })
    ).rejects.toEqual(new AppError('Car already exists'))
  })

  it('should not be able to create a car with non exists category', async () => {
    await expect(
      createCarUseCase.execute({
        name: 'Name car 2',
        brand: 'Brand car',
        category_id: 'non exists',
        daily_rate: 100,
        description: 'description',
        fine_amount: 50,
        license_plate: 'ABC-1234',
      })
    ).rejects.toEqual(new AppError('Category not exists'))
  })

  it('should not be able to create a car with available true by default', async () => {
    const category = await categoriesRepository.create({
      description: 'Carros',
      name: 'Carros',
    })

    const car = await createCarUseCase.execute({
      name: 'Name car',
      brand: 'Brand car',
      category_id: category.id,
      daily_rate: 100,
      description: 'description',
      fine_amount: 50,
      license_plate: 'ABC-1234',
    })

    expect(car.available).toBe(true)
  })
})
