import csvParse from 'csv-parse'
import fs from 'fs'

import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path)

    const parseFile = csvParse()

    stream.pipe(parseFile)

    stream.on('data', async line => {
      console.log(line)
    })
  }
}
