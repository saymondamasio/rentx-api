import path from 'path'
import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('DateProvider') private dateProvider: IDateProvider,
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found')
    }

    const { token } = await this.userTokensRepository.create({
      user_id: user.id,
      expires_date: this.dateProvider.addHours(new Date(), 3),
    })

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgot_password.hbs'
    )

    await this.mailProvider.sendMail({
      subject: 'Recuperação de senha',
      templateData: {
        fileTemplate: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.FORGOT_MAIL_URL}?token=${token}`,
        },
      },
      to: {
        email: user.email,
        name: user.name,
      },
    })
  }
}
