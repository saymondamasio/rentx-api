import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

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
    const decoded = verify(token, 'd549672df01baa5eb91e26071e07f3563fefed0e')

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
