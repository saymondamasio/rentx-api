import { Request, Response } from 'express'

import { authConfig } from '@config/auth'

export class RevokeTokenController {
  handle(_: Request, response: Response): Response {
    response.cookie('refresh_token', '', {
      secure: false,
      httpOnly: true,
      maxAge: 0,
      path: authConfig.path_refresh_token,
    })

    return response.status(204).send()
  }
}
