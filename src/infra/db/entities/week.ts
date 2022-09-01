import { ExerciseModel, WeekModel } from '@/domain/models/week'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('week')
export class Week extends BaseEntity implements WeekModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column('simple-array')
    goals: string[]

  @Column('simple-json')
    exercises: ExerciseModel[]
}
