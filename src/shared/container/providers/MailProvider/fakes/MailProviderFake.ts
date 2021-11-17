import { ISendMailDTO } from '../dtos/ISendMailDTO'
import { IMailProvider } from '../IMailProvider'

export class MailProviderFake implements IMailProvider {
  private mails = []

  async sendMail(data: ISendMailDTO): Promise<void> {
    this.mails.push(data)
  }
}
