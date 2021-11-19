import { inject, injectable } from 'tsyringe'

import { IUser } from '@modules/accounts/entities/IUser'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

@injectable()
export class ShowProfileUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id)

    return user
  }
}
