import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

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

  @Column()
  password: string

  @Column({ default: false })
  admin?: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
