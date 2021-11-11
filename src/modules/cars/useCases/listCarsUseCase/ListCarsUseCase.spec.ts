import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake'
import { ListCarsUseCase } from './ListCarsUseCase'

let carsRepository: CarsRepositoryFake
let listCarsUseCase: ListCarsUseCase

describe('List Cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryFake()
    listCarsUseCase = new ListCarsUseCase(carsRepository)
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepository.create({
      name: 'Fusca',
      brand: 'VW',
      category_id: 'category',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepository.create({
      name: 'Fusca',
      brand: 'VW',
      category_id: 'category',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
    })

    await carsRepository.create({
      name: 'Fusca2',
      brand: 'VW',
      category_id: 'category',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
    })

    const cars = await listCarsUseCase.execute({ name: 'Fusca' })

    expect(cars).toEqual([car])
  })
})
