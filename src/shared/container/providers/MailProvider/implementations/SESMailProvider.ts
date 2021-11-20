import { SES } from 'aws-sdk'
import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'

import { IMailTemplateProvider } from '../../MailTemplateProvider/IMailTemplateProvider'
import { ISendMailDTO } from '../dtos/ISendMailDTO'
import { IMailProvider } from '../IMailProvider'

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    const transporter = nodemailer.createTransport({
      SES: new SES(),
    })

    this.client = transporter
  }

  async sendMail({
    subject,
    templateData,
    to,
    from,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Rentx',
        address: from?.email || 'noreplay@rentx.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })
  }
}
