import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'

interface ITokenPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.headers.authorization) {
    throw new Error('Token is missing')
  }

  const [, token] = req.headers.authorization.split(' ')

  try {
    const decoded = verify(token, 'd549672df01baa5eb91e26071e07f3563fefed0e')

    const { sub: user_id } = decoded as ITokenPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findByEmail(user_id)

    if (!user) {
      throw new Error('User not found')
    }

    // req.user = user

    return next()
  } catch (err) {
    throw new Error('Token invalid')
  }
}
