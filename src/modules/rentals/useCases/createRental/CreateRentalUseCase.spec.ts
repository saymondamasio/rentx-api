import dayjs from 'dayjs'

import { RentalsRepositoryFake } from '@modules/rentals/repositories/fakes/RentalsRepositoryFake'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let rentalsRepository: RentalsRepositoryFake
let createRentalUseCase: CreateRentalUseCase

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryFake()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository)
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '123',
      expected_return_date: dayAdd24Hours,
      user_id: '321',
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open same user', async () => {
    await createRentalUseCase.execute({
      car_id: '123',
      expected_return_date: dayAdd24Hours,
      user_id: 'user',
    })

    await expect(
      createRentalUseCase.execute({
        car_id: '321',
        expected_return_date: dayAdd24Hours,
        user_id: 'user',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if there is another open same car', async () => {
    await createRentalUseCase.execute({
      car_id: 'car',
      expected_return_date: dayAdd24Hours,
      user_id: '321',
    })

    await expect(
      createRentalUseCase.execute({
        car_id: 'car',
        expected_return_date: dayAdd24Hours,
        user_id: '123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: 'car',
        expected_return_date: new Date(),
        user_id: '123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
