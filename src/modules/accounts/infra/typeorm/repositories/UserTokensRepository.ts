import { getRepository, Repository } from 'typeorm'

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUserToken } from '@modules/accounts/entities/IUserToken'
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository'

import { UserToken } from '../entities/UserToken'

export class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<IUserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByToken(token: string): Promise<IUserToken> {
    const userToken = await this.repository.findOne({ token })

    return userToken
  }

  async create({
    expires_date,
    user_id,
  }: ICreateUserTokenDTO): Promise<IUserToken> {
    const userToken = this.repository.create({
      expires_date,
      user_id,
    })

    await this.repository.save(userToken)

    return userToken
  }
}
