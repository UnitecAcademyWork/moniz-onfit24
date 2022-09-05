import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Ingredient, Nutrition, RecipeModel } from '@/domain/models/recipe'

@Entity('recipe')
export class Recipe extends BaseEntity implements RecipeModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    name: string

  @Column()
    description: string

  @Column()
    prepTime: string

  @Column()
    cookTime: string

  @Column()
    difficulty: string

  @Column()
    serves: string

  @Column()
    url: string

  @Column('simple-json')
    nutrition: Nutrition

  @Column('simple-array')
    tags: string[]

  @Column('simple-array')
    ingredients: Ingredient[]

  @Column('simple-array')
    steps: string[]

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
