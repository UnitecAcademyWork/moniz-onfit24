import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'
import { AccountModel } from '@/domain/models/account'

@Entity('account')
@Unique(['email'])
export class Account extends BaseEntity implements AccountModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    name: string

  @Column()
    email: string

  @Column()
    password: string

  @Column({
    default: ''
  })
    accessToken: string

  @Column({
    default: ''
  })
    role: string

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
