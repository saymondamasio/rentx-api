import { sign, verify } from 'jsonwebtoken'
import { injectable } from 'tsyringe'

import { authConfig } from '@config/auth'

interface IPayload {
  sub: string
  email: string
}

@injectable()
export class RefreshTokenUseCase {
  async execute(refresh_token: string): Promise<string> {
    const { sub: user_id } = verify(
      refresh_token,
      authConfig.secret_refresh_token
    ) as IPayload

    const token = sign({}, authConfig.secret_token, {
      subject: user_id,
      expiresIn: authConfig.expires_in_token,
    })

    return token
  }
}
