import { ServerError } from '@/presentation/errors'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { UpdateRecipeController } from './update-recipe-controller'
import { AddRecipe, AddRecipeModel, HttpRequest, RecipeModel } from './update-recipe-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
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
  },
  params: {
    recipeId: 'any_id'
  }
})

const makeFakeRecipe = (): RecipeModel => ({
  id: 'any_id',
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

const makeAddRecipe = (): AddRecipe => {
  class AddRecipeStub implements AddRecipe {
    async add (recipeData: AddRecipeModel, id: string): Promise<RecipeModel> {
      return Promise.resolve(makeFakeRecipe())
    }
  }
  return new AddRecipeStub()
}

interface SutTypes {
  sut: UpdateRecipeController
  addRecipeStub: AddRecipe
}

const makeSut = (): SutTypes => {
  const addRecipeStub = makeAddRecipe()
  const sut = new UpdateRecipeController(addRecipeStub)
  return { sut, addRecipeStub }
}

describe('AddRecipe Controller', () => {
  test('should call AddRecipe with correct values', async () => {
    const { sut, addRecipeStub } = makeSut()
    const addSpy = jest.spyOn(addRecipeStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
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
    }, 'any_id')
  })

  test('should return 500 if AddRecipe throws', async () => {
    const { sut, addRecipeStub } = makeSut()
    jest.spyOn(addRecipeStub, 'add').mockImplementationOnce(async () => { return await Promise.reject(new Error()) })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeRecipe()))
  })
})
