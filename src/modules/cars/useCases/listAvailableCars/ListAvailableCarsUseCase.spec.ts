import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let carsRepository: CarsRepositoryFake
let listAvailableCarsUseCase: ListAvailableCarsUseCase

describe('List Cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryFake()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository)
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

    const cars = await listAvailableCarsUseCase.execute({})

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

    const cars = await listAvailableCarsUseCase.execute({ name: 'Fusca' })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
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
      brand: 'WW',
      category_id: 'category',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
    })

    const cars = await listAvailableCarsUseCase.execute({ brand: 'VW' })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepository.create({
      name: 'Fusca',
      brand: 'VW',
      category_id: '111',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
    })

    await carsRepository.create({
      name: 'Fusca2',
      brand: 'VW',
      category_id: '222',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
    })

    const cars = await listAvailableCarsUseCase.execute({ category_id: '111' })

    expect(cars).toEqual([car])
  })
})
