import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'
import { resolve } from 'path'

const rootFolder = resolve(__dirname, '..', '..')
const tmpFolder = resolve(__dirname, rootFolder, 'tmp')
const uploadFolder = resolve(__dirname, rootFolder, 'uploads')

interface IStorageConfig {
  driver: 'disk' | 's3'

  tmpFolder: string
  uploadFolder: string

  upload: { multer: { storage: StorageEngine } }
  config: {
    disk: unknown
    aws: {
      bucket: string
    }
  }
}

export const storageConfig = {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tmpFolder,
  uploadFolder,

  upload: {
    multer: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename(req, file, cb) {
          const fileHash = crypto.randomBytes(10).toString('hex')
          const fileName = `${fileHash}-${file.originalname.replace(/ /g, '_')}`

          return cb(null, fileName)
        },
      }),
    },
  },
  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IStorageConfig
