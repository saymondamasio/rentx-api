import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'

import { RefreshTokenUseCase } from './RefreshTokenUseCase'

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

    if (!request.cookies || !request.cookies.refresh_token)
      throw new AppError('Refresh token not found')

    const token = await refreshTokenUseCase.execute(
      request.cookies.refresh_token
    )

    return response.json({ token })
  }
}
