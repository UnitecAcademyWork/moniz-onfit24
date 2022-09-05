import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { AddRecipeController } from './add-recipe-controller'
import { AddRecipe, AddRecipeModel, HttpRequest, RecipeModel, Validation } from './add-recipe-controller.protocols'

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

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddRecipe = (): AddRecipe => {
  class AddRecipeStub implements AddRecipe {
    async add (recipeData: AddRecipeModel): Promise<RecipeModel> {
      return Promise.resolve(makeFakeRecipe())
    }
  }
  return new AddRecipeStub()
}

interface SutTypes {
  sut: AddRecipeController
  validationStub: Validation
  addRecipeStub: AddRecipe
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addRecipeStub = makeAddRecipe()
  const sut = new AddRecipeController(validationStub, addRecipeStub)
  return { sut, validationStub, addRecipeStub }
}

describe('AddRecipe Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

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
    })
  })

  test('should return 500 if AddRecipe throws', async () => {
    const { sut, addRecipeStub } = makeSut()
    jest.spyOn(addRecipeStub, 'add').mockImplementationOnce(async () => { return await Promise.reject(new Error()) })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })
})
