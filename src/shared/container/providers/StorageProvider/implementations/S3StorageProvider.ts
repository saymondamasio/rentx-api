import { S3 } from 'aws-sdk'
import fs from 'fs/promises'
import mime from 'mime-types'
import { resolve } from 'path'

import { storageConfig } from '@config/storage'

import { IStorageProvider } from '../IStorageProvider'

export class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3()
  }

  async saveFile(file: string, folder: string): Promise<string> {
    const originalPath = resolve(storageConfig.tmpFolder, file)

    const originalFile = await fs.readFile(originalPath)

    const contentType = mime.lookup(originalPath) as string

    await this.client
      .putObject({
        Bucket: `${storageConfig.config.aws.bucket}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: originalFile,
        ContentType: contentType,
      })
      .promise()

    await fs.unlink(originalPath)

    return file
  }

  async deleteFile(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${storageConfig.config.aws.bucket}/${folder}`,
        Key: file,
      })
      .promise()
  }
}
