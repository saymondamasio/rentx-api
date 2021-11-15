import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { UsersRepositoryFake } from '@modules/accounts/repositories/fakes/UsersRepositoryFake'
import { AppError } from '@shared/errors/AppError'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let usersRepositoryFake: UsersRepositoryFake

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryFake = new UsersRepositoryFake()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryFake)
    createUserUseCase = new CreateUserUseCase(usersRepositoryFake)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      driver_license: '123456789',
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'nonuser@mail.com',
        password: '123456',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'))
  })

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      driver_license: '123456789',
    }

    await createUserUseCase.execute(user)

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'password-incorrect',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'))
  })
})
