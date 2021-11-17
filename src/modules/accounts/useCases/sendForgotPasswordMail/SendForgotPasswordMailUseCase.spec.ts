import { UsersRepositoryFake } from '@modules/accounts/repositories/fakes/UsersRepositoryFake'
import { UserTokensRepositoryFake } from '@modules/accounts/repositories/fakes/UserTokensRepositoryFake'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { MailProviderFake } from '@shared/container/providers/MailProvider/fakes/MailProviderFake'

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let mailProvider: MailProviderFake
let userTokensRepository: UserTokensRepositoryFake
let usersRepository: UsersRepositoryFake
let dateProvider: DayjsDateProvider
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    mailProvider = new MailProviderFake()
    userTokensRepository = new UserTokensRepositoryFake()
    usersRepository = new UsersRepositoryFake()
    dateProvider = new DayjsDateProvider()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      dateProvider,
      mailProvider,
      usersRepository,
      userTokensRepository
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      driver_license: '123456789',
    })

    await sendForgotPasswordMailUseCase.execute('johndoe@mail.com')

    expect(sendMail).toHaveBeenCalled()
  })
})
