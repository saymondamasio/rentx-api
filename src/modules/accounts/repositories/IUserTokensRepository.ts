import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { IUserToken } from '../entities/IUserToken'

export interface IUserTokensRepository {
  delete(id: string): Promise<void>
  findByToken(token: string): Promise<IUserToken>
  create(data: ICreateUserTokenDTO): Promise<IUserToken>
}
