import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'
import { resolve } from 'path'

const rootFolder = resolve(__dirname, '..', '..')
const tmpFolder = resolve(__dirname, rootFolder, 'tmp')
const uploadFolder = resolve(__dirname, rootFolder, 'uploads')

interface IStorageConfig {
  provider: 'disk' | 's3'

  tmpFolder: string
  uploadFolder: string

  upload: { multer: { storage: StorageEngine } }
  config: {
    disk: {
      url: string
    }
    aws: {
      bucket: string
      url: string
    }
  }
}

export const storageConfig = {
  provider: process.env.STORAGE_PROVIDER || 'disk',

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
    disk: {
      url: process.env.APP_API_URL,
    },
    aws: {
      bucket: process.env.AWS_BUCKET,
      url: `http://${process.env.AWS_BUCKET}.s3.amazonaws.com`,
    },
  },
} as IStorageConfig
