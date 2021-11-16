import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { deleteFile } from '@utils/file'

interface IRequest {
  user_id: string
  avatar_file: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar, 'avatar')
    }

    await this.storageProvider.saveFile(avatar_file, 'avatar')
    user.avatar = avatar_file

    await this.usersRepository.save(user)
  }
}
