import { IParseMailTemplateDTO } from './dtos/IParseMailTemplateDTO'

export interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>
}
