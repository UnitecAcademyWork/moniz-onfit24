import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { AccountInfoModel } from '@/domain/models/account'
import { Account } from './account'

@Entity('accountInfo')
@Unique(['accountId'])
export class AccountInfo extends BaseEntity implements AccountInfoModel {
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
