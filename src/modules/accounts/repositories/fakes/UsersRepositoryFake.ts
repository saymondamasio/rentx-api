import { v4 as uuid } from 'uuid'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'

import { IUsersRepository } from '../IUsersRepository'

export class UsersRepositoryFake implements IUsersRepository {
  private users: User[] = []

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user: User = {
      id: uuid(),
      name,
      email,
      password,
      driver_license,
      getAvatarUrl: undefined,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.users.push(user)
  }
  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(u => u.id === user.id)

    this.users[userIndex] = user
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }
}
