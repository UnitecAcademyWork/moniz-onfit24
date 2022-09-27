import { CategoryModel } from '@/domain/models/category'
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Program } from './program'

@Entity('category')
export class Category extends BaseEntity implements CategoryModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    name: string

  @Column()
    img: string

  @Column()
    description: string

  @ManyToMany(() => Program, { onDelete: 'CASCADE' })
  @JoinTable()
    programs: Program[]
}
