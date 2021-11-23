import { parse } from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    const categories: IImportCategory[] = []

    const stream = fs.createReadStream(file.path)

    const parsedFile = parse()

    stream.pipe(parsedFile)

    for await (const chunk of parsedFile) {
      const [name, description] = chunk

      categories.push({ name, description })
    }

    await fs.promises.unlink(file.path)

    return categories
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async category => {
      const { name, description } = category

      const categoryExists = await this.categoriesRepository.findByName(name)
      if (!categoryExists) {
        await this.categoriesRepository.create({
          name,
          description,
        })
      }
    })
  }
}
