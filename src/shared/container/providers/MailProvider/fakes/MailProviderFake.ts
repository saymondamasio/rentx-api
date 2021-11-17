import { ISendMailDTO } from '../dtos/ISendMailDTO'
import { IMailProvider } from '../IMailProvider'

export class MailProviderFake implements IMailProvider {
  mails = []

  async sendMail(data: ISendMailDTO): Promise<void> {
    console.log('Simulando envio de email...')
    this.mails.push(data)
  }
}
