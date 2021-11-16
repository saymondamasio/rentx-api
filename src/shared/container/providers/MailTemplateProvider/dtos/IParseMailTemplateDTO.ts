interface ITemplateVariables {
  [key: string]: string | number
}

export interface IParseMailTemplateDTO {
  fileTemplate: string
  variables: ITemplateVariables
}
