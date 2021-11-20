import { Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { storageConfig } from '@config/storage'
import { ICarImage } from '@modules/cars/entities/ICarImage'

@Entity('car_images')
export class CarImage implements ICarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  car_id: string

  @Column()
  image_name: string

  @Expose({ name: 'image_url' })
  getAvatarUrl(): string | null {
    if (!this.image_name) return null

    switch (storageConfig.provider) {
      case 'disk':
        return `${storageConfig.config.disk.url}/cars/${this.image_name}`
      case 's3':
        return `${storageConfig.config.aws.url}/cars/${this.image_name}`
      default:
        return null
    }
  }

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
