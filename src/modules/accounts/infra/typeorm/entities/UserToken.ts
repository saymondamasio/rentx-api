import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { IUserToken } from '@modules/accounts/entities/IUserToken'

import { User } from './User'

export class UserToken implements IUserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  refresh_token: string

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  expires_date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
