import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake'
import { SpecificationsRepositoryFake } from '@modules/cars/repositories/fakes/SpecificationsRepositoryFake'
import { AppError } from '@shared/errors/AppError'

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let carsRepository: CarsRepositoryFake
let specificationsRepository: SpecificationsRepositoryFake
let createCarSpecificationUseCase: CreateCarSpecificationUseCase

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryFake()
    specificationsRepository = new SpecificationsRepositoryFake()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    )
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepository.create({
      name: 'Fusca',
      brand: 'VW',
      category_id: '1',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC-1234',
    })

    const specification = await specificationsRepository.create({
      description: 'teste',
      name: 'teste',
    })

    const carUpdated = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    })

    expect(carUpdated).toHaveProperty('specifications')
    expect(carUpdated.specifications.length).toBe(1)
  })

  it('should be able to add a new specification to a nonexisting car', async () => {
    const car_id = 'car_id'
    const specifications_id = ['11']

    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toEqual(new AppError('Car not found'))
  })
})
