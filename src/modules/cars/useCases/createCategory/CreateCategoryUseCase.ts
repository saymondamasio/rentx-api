import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    )

    if (categoryAlreadyExists) {
      throw new Error('Category already exists')
    }

    await this.categoriesRepository.create({
      name,
      description,
    })
  }
}
