import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { IRental } from '@modules/rentals/entities/IRental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('DateProvider') private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<IRental> {
    const minimumHoursDevolution = 24

    const car = await this.carsRepository.findById(car_id)

    if (!car) {
      throw new AppError('Car not found')
    }

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

    const compare = this.dateProvider.differenceInHours(
      new Date(),
      expected_return_date
    )

    if (compare < minimumHoursDevolution) {
      throw new AppError('Minimum rental time is 24 hours')
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}
