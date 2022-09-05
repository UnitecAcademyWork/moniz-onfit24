import { AddRecipeModel } from '@/domain/usecases/recipe/add-recipe'
import { TypeormHelper } from '../typeorm-helper'
import { RecipeRepository } from './recipe-repository'

const makeFakeRecipeData = (): AddRecipeModel => ({
  name: 'any_name',
  description: 'any_description',
  prepTime: 'any_preTime',
  cookTime: 'any_cookTime',
  difficulty: 'any_difficulty',
  serves: 'any_serving',
  url: 'any_url',
  nutrition: {
    kcal: 'any_kcal',
    fat: 'any_fat',
    saturates: 'any_saturates',
    carbs: 'any_carbs',
    sugar: 'any_sugar',
    fibre: 'any_fibre',
    protein: 'any_protein',
    salt: 'any_salt'
  },
  tags: ['any_tag', 'other_tag'],
  ingredients: [{
    name: 'any_name',
    quantity: 'any_quantity'
  },
  {
    name: 'other_name',
    quantity: 'other_quantity'
  }],
  steps: ['any_step', 'other_step']
})

describe('Recipe Repository', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

  const makeSut = (): RecipeRepository => {
    return new RecipeRepository()
  }

  describe('add()', () => {
    test('should return an account on add success', async () => {
      const sut = makeSut()
      const recipe = await sut.add(makeFakeRecipeData())
      expect(recipe).toBeTruthy()
      expect(recipe.id).toBeTruthy()
      expect(recipe.name).toBe('any_name')
      expect(recipe.description).toBe('any_description')
      expect(recipe.prepTime).toBe('any_preTime')
      expect(recipe.cookTime).toBe('any_cookTime')
      expect(recipe.difficulty).toBe('any_difficulty')
      expect(recipe.serves).toBe('any_serving')
      expect(recipe.url).toBe('any_url')
      expect(recipe.nutrition).toEqual({
        kcal: 'any_kcal',
        fat: 'any_fat',
        saturates: 'any_saturates',
        carbs: 'any_carbs',
        sugar: 'any_sugar',
        fibre: 'any_fibre',
        protein: 'any_protein',
        salt: 'any_salt'
      })
      expect(recipe.tags).toEqual(['any_tag', 'other_tag'])
      expect(recipe.ingredients).toEqual([{
        name: 'any_name',
        quantity: 'any_quantity'
      },
      {
        name: 'other_name',
        quantity: 'other_quantity'
      }])
      expect(recipe.steps).toEqual(['any_step', 'other_step'])
    })
  })

  describe('loadAll()', () => {
    test('should load all recipes on success', async () => {
      const sut = makeSut()
      await sut.add(makeFakeRecipeData())
      await sut.add(makeFakeRecipeData())
      const recipes = await sut.loadAll()
      expect(recipes.length).toBe(2)
      expect(recipes[0].name).toBe('any_name')
      expect(recipes[1].name).toBe('any_name')
    })

    test('should load empty list', async () => {
      const sut = makeSut()
      const recipes = await sut.loadAll()
      expect(recipes.length).toBe(0)
    })
  })
})
