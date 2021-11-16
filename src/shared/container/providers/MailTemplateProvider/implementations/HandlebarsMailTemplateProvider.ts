import fs from 'fs'
import handlebars from 'handlebars'

import { IParseMailTemplateDTO } from '../dtos/IParseMailTemplateDTO'
import { IMailTemplateProvider } from '../IMailTemplateProvider'

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    fileTemplate,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(fileTemplate, {
      encoding: 'utf-8',
    })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}
