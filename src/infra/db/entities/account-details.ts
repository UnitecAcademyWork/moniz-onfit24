import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { AccountDetailsModel } from '@/domain/models/account'
import { Account } from './account'

@Entity('account_details')
@Unique(['accountId'])
export class AccountDetails extends BaseEntity implements AccountDetailsModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    accountId: string

  @Column()
    birth: string

  @Column()
    weight: string

  @Column()
    height: string

  @Column()
    gender: string

  @Column()
    objective: string

  @OneToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn()
    account: Account
}
