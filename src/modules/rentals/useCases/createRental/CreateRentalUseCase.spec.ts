import dayjs from 'dayjs'

import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake'
import { RentalsRepositoryFake } from '@modules/rentals/repositories/fakes/RentalsRepositoryFake'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let rentalsRepository: RentalsRepositoryFake
let carsRepository: CarsRepositoryFake
let dateProvider: DayjsDateProvider
let createRentalUseCase: CreateRentalUseCase

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryFake()
    carsRepository = new CarsRepositoryFake()
    dateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository,
      dateProvider
    )
  })

  it('should be able to create a new rental', async () => {
    const car = await carsRepository.create({
      name: 'Fusca',
      brand: 'VW',
      category_id: 'category id',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC-1234',
    })

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
      user_id: '321',
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open same user', async () => {
    const car1 = await carsRepository.create({
      name: 'Fusca',
      brand: 'VW',
      category_id: 'category id',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC-1234',
    })

    const car2 = await carsRepository.create({
      name: 'Fusca',
      brand: 'VW',
      category_id: 'category id',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC-4321',
    })

    await createRentalUseCase.execute({
      car_id: car1.id,
      expected_return_date: dayAdd24Hours,
      user_id: 'user',
    })

    await expect(
      createRentalUseCase.execute({
        car_id: car2.id,
        expected_return_date: dayAdd24Hours,
        user_id: 'user',
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  })

  it('should not be able to create a new rental if there is another open same car', async () => {
    const car = await carsRepository.create({
      name: 'Fusca',
      brand: 'VW',
      category_id: 'category id',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC-1234',
    })

    await createRentalUseCase.execute({
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
      user_id: '321',
    })

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
        user_id: '123',
      })
    ).rejects.toEqual(new AppError('Car unavailable'))
  })

  it('should not be able to create a new rental with non existent car', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: 'non existing',
        expected_return_date: dayAdd24Hours,
        user_id: '123',
      })
    ).rejects.toEqual(new AppError('Car not found'))
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    const car = await carsRepository.create({
      name: 'Fusca',
      brand: 'VW',
      category_id: 'category id',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC-1234',
    })

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        expected_return_date: new Date(),
        user_id: '123',
      })
    ).rejects.toEqual(new AppError('Minimum rental time is 24 hours'))
  })
})
