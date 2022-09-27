import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ProgramModel } from '@/domain/models/program'
import { Week } from './week'
import { Category } from './category'

@Entity('program')
export class Program extends BaseEntity implements ProgramModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    description: string

  @Column()
    name: string

  @Column()
    url: string

  @Column()
    difficulty: string

  @Column()
    duration?: string

  @Column('simple-array')
    objective?: string[]

  @Column('simple-array')
    equipment?: string[]

  @ManyToMany(() => Week, { onDelete: 'CASCADE' })
  @JoinTable()
    weeks: Week[]

  @ManyToMany(() => Category, { onDelete: 'CASCADE' })
  @JoinTable()
    categories: Category[]

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
