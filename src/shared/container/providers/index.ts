import { container } from 'tsyringe'

import { storageConfig } from '@config/storage'

import { ICacheProvider } from './CacheProvider/ICacheProvider'
import { RedisCacheProvider } from './CacheProvider/implementations/RedisCacheProvider'
import { IDateProvider } from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { IMailTemplateProvider } from './MailTemplateProvider/IMailTemplateProvider'
import { HandlebarsMailTemplateProvider } from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'
import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider'
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'

const storage = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storage[storageConfig.driver]
)

container.registerSingleton<ICacheProvider>('CacheProvider', RedisCacheProvider)
