import { ObjectiveModel } from '@/domain/models/objective'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('objective')
@Unique(['name'])
export class Objective extends BaseEntity implements ObjectiveModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    name: string

  @Column()
    icon: string

  @Column()
    description: string
}
