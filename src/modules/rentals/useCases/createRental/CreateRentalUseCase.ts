import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { inject, injectable } from 'tsyringe'

import { IRental } from '@modules/rentals/entities/IRental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError'

dayjs.extend(utc)

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<IRental> {
    const minimumHour = 24

    const rentalByCarUnavailable =
      await this.rentalsRepository.findOpenRentalByCar(car_id)

    if (rentalByCarUnavailable) {
      throw new AppError('Car unavailable')
    }
    const rentalByUserUnavailable =
      await this.rentalsRepository.findOpenRentalByUser(user_id)

    if (rentalByUserUnavailable) {
      throw new AppError("There's a rental in progress for user!")
    }

    const expectedReturnDate = dayjs(expected_return_date)
      .utc()
      .local()
      .format()

    const dateNow = dayjs().utc().local().format()

    const compare = dayjs(expectedReturnDate).diff(dateNow, 'hours')

    if (compare < minimumHour) {
      throw new AppError('Minimum rental time is 24 hours')
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    })

    return rental
  }
}
