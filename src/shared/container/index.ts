import { container } from 'tsyringe'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository'
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { NotificationsRepository } from '@modules/notifications/infra/repositories/NotificationsRepository'
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

import '@shared/container/providers'

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

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)

container.registerSingleton<ICarImagesRepository>(
  'CarImagesRepository',
  CarImagesRepository
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
)
