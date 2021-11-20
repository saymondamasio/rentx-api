import { container } from 'tsyringe'

import { IMailTemplateProvider } from './IMailTemplateProvider'
import { HandlebarsMailTemplateProvider } from './implementations/HandlebarsMailTemplateProvider'

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
)
