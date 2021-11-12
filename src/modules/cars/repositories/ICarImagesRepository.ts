import { ICreateCarImageDTO } from '../dtos/ICreateCarImageDTO'
import { ICarImage } from '../entities/ICarImage'

export interface ICarImagesRepository {
  create(data: ICreateCarImageDTO): Promise<ICarImage>
}
