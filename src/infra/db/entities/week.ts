import { ExerciseModel, WeekModel } from '@/domain/models/week'
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Program } from './program'

@Entity('week')
export class Week extends BaseEntity implements WeekModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    programId: string

  @Column('simple-array')
    goals: string[]

  @Column('simple-json')
    exercises: ExerciseModel[]

  @OneToOne(() => Program, { onDelete: 'CASCADE' })
  @JoinColumn()
    program: Program
}
