import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { IUserToken } from '../entities/IUserToken'

export interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<IUserToken>
}
