import { Exclude, Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { storageConfig } from '@config/storage'
import { IUser } from '@modules/accounts/entities/IUser'

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  driver_license: string

  @Column({ nullable: true })
  avatar?: string

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null

    switch (storageConfig.provider) {
      case 'disk':
        return `${storageConfig.config.disk.url}/avatar/${this.avatar}`
      case 's3':
        return `${storageConfig.config.aws.url}/avatar/${this.avatar}`
      default:
        return null
    }
  }

  @Exclude()
  @Column()
  password: string

  @Column({ default: false })
  admin?: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
