import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { authConfig } from '@config/auth'
import { IUser } from '@modules/accounts/entities/IUser'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: IUser
  token: string
  refresh_token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ password, email }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const token = sign({}, authConfig.secret_token, {
      subject: user.id,
      expiresIn: authConfig.expires_in_token,
    })

    const refresh_token = sign({}, authConfig.secret_refresh_token, {
      subject: user.id,
      expiresIn: authConfig.expires_in_refresh_token,
    })

    return { user, token, refresh_token }
  }
}
