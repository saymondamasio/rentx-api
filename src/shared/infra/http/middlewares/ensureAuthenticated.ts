import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { authConfig } from '@config/auth'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppError'

interface ITokenPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.headers.authorization) {
    throw new AppError('Token is missing', 401)
  }

  const [, token] = req.headers.authorization.split(' ')

  try {
    const decoded = verify(token, authConfig.secret_token)

    const { sub: user_id } = decoded as ITokenPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 401)
    }

    req.user_id = user_id

    return next()
  } catch (err) {
    throw new AppError('Token invalid', 401)
  }
}
