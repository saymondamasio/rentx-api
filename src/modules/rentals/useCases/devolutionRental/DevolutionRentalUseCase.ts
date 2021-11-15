import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { IRental } from '@modules/rentals/entities/IRental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  id: string
  user_id: string
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('DateProvider') private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<IRental> {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)

    if (!rental) {
      throw new AppError('Rental not found!')
    }

    let dailyInDays = this.dateProvider.differenceInDays(
      rental.start_date,
      new Date()
    )

    // se a diaria for menor que um dia, será cobrado uma diaria
    if (dailyInDays <= 0) {
      dailyInDays = 1
    }

    const delayInDays = this.dateProvider.differenceInDays(
      new Date(),
      rental.expected_return_date
    )

    let total = 0

    if (delayInDays > 0) {
      const calculated_fine = dailyInDays * car.fine_amount
      total = calculated_fine
    }

    total += dailyInDays * car.daily_rate

    rental.end_date = this.dateProvider.utcToLocal(new Date())
    rental.total = total

    await this.rentalsRepository.save(rental)
    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}
