import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { authConfig } from '@config/auth'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const { token, user, refresh_token } =
      await authenticateUserUseCase.execute({
        email,
        password,
      })

    response.cookie('refresh_token', refresh_token, {
      secure: authConfig.httpSecure,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: authConfig.path_refresh_token,
    })

    return response.json({ user: instanceToInstance(user), token })
  }
}
