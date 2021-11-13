import { container } from 'tsyringe'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { RentalsRepositoryFake } from '@modules/rentals/repositories/fakes/RentalsRepositoryFake'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<ICarImagesRepository>(
  'CarImagesRepository',
  CarImagesRepository
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepositoryFake
)
