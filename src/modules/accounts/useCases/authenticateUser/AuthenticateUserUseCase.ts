import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ password, email }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email or password incorrect!')
    }

    const token = sign({}, 'd549672df01baa5eb91e26071e07f3563fefed0e', {
      subject: user.id,
      expiresIn: '1d',
    })

    return { user, token }
  }
}
