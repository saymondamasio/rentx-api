import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'

import { IUsersRepository } from '../../../repositories/IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    })

    await this.repository.save(user)
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })

    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)

    return user
  }
}
