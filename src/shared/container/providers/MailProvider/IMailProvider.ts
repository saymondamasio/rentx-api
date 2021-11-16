import { ISendMailDTO } from './dtos/ISendMailDTO'

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>
}
