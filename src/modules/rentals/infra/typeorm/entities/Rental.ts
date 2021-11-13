import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { IRental } from '@modules/rentals/entities/IRental'

@Entity('rentals')
export class Rental implements IRental {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  car_id: string

  @Column()
  user_id: string

  @Column()
  start_date: Date

  @Column()
  end_date?: Date

  @Column()
  expected_return_date: Date

  @Column()
  total?: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
