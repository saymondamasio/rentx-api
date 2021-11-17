import { v4 as uuid } from 'uuid'

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUserToken } from '@modules/accounts/entities/IUserToken'

import { IUserTokensRepository } from '../IUserTokensRepository'

export class UserTokensRepositoryFake implements IUserTokensRepository {
  private userTokens: IUserToken[] = []

  async delete(id: string): Promise<void> {
    const userTokenIndex = this.userTokens.findIndex(
      userToken => userToken.id === id
    )

    this.userTokens.splice(userTokenIndex, 1)
  }

  async findByToken(token: string): Promise<IUserToken> {
    const userToken = this.userTokens.find(
      userToken => userToken.token === token
    )

    return userToken
  }
  async create({
    expires_date,
    user_id,
  }: ICreateUserTokenDTO): Promise<IUserToken> {
    const userToken: IUserToken = {
      id: uuid(),
      expires_date,
      user_id,
      token: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.userTokens.push(userToken)

    return userToken
  }
}
