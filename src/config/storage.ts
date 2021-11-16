import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'
import { resolve } from 'path'

const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

interface IStorageConfig {
  driver: 'disk'

  tmpFolder: string
  uploadFolder: string

  multer(folder: string[]): { storage: StorageEngine }
  config: {
    disk: unknown
  }
}

export const storageConfig = {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadFolder: resolve(tmpFolder, 'uploads'),

  multer(folder: string[]) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', ...folder),
        filename(req, file, cb) {
          const fileHash = crypto.randomBytes(10).toString('hex')
          const fileName = `${fileHash}-${file.originalname.replace(/ /g, '_')}`

          return cb(null, fileName)
        },
      }),
    }
  },
  config: {
    disk: {},
  },
} as IStorageConfig
