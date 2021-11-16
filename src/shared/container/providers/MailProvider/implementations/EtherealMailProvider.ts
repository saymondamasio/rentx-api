import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'

import { IMailTemplateProvider } from '../../MailTemplateProvider/IMailTemplateProvider'
import { ISendMailDTO } from '../dtos/ISendMailDTO'
import { IMailProvider } from '../IMailProvider'

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })

        this.client = transporter
      })
      .catch(err => console.error(err))
  }

  async sendMail({
    subject,
    templateData,
    to,
    from,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Rentx',
        address: from?.email || 'noreplay@rentx.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: 'Ola testando o email',
      html: await this.mailTemplateProvider.parse(templateData),
    })

    console.log('Message %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
