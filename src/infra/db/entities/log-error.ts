import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('log_error')
export class LogError extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    stack: string

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
