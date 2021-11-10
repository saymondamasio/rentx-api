import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake'
import { AppError } from '@shared/errors/AppError'

import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepository: CarsRepositoryFake

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryFake()
    createCarUseCase = new CreateCarUseCase(carsRepository)
  })

  it('should be able to create car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      brand: 'Brand car',
      category_id: 'category',
      daily_rate: 100,
      description: 'description',
      fine_amount: 50,
      license_plate: 'ABC-1234',
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Name car',
      brand: 'Brand car',
      category_id: 'category',
      daily_rate: 100,
      description: 'description',
      fine_amount: 50,
      license_plate: 'ABC-1234',
    })

    await expect(
      createCarUseCase.execute({
        name: 'Name car 2',
        brand: 'Brand car',
        category_id: 'category',
        daily_rate: 100,
        description: 'description',
        fine_amount: 50,
        license_plate: 'ABC-1234',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      brand: 'Brand car',
      category_id: 'category',
      daily_rate: 100,
      description: 'description',
      fine_amount: 50,
      license_plate: 'ABC-1234',
    })

    expect(car.available).toBe(true)
  })
})
