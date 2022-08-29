import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ProgramModel } from '@/domain/models/program'

@Entity('program')
export class Program extends BaseEntity implements ProgramModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    description: string

  @Column()
    name: string

  @Column()
    difficulty: string

  @Column()
    duration?: string

  @Column('simple-array')
    objective?: string[]

  @Column('simple-array')
    equipment?: string[]

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
