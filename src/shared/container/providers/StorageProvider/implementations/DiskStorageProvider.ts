import fs from 'fs'
import path from 'path'

import { storageConfig } from '@config/storage'

import { IStorageProvider } from '../IStorageProvider'

export class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(storageConfig.tmpFolder, file),
      path.resolve(storageConfig.uploadFolder, folder, file)
    )

    return file
  }

  public async deleteFile(file: string, folder: string): Promise<void> {
    const filePath = path.resolve(storageConfig.uploadFolder, folder, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
