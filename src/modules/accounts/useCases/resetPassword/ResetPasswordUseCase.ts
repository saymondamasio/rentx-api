import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  token: string
  password: string
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('DateProvider') private dateProvider: IDateProvider,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('Token invalid!')
    }

    const tokenExpired = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      new Date()
    )

    if (tokenExpired) {
      throw new AppError('Token invalid!')
    }

    const passwordHashed = await hash(password, 8)

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = passwordHashed

    await this.usersRepository.save(user)

    await this.userTokensRepository.delete(userToken.id)
  }
}
