import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadRecipeController } from './load-recipe-controller'
import { HttpRequest, LoadRecipeById, RecipeModel } from './load-recipe-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
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

const makeLoadRecipeById = (): LoadRecipeById => {
  class LoadRecipeByIdStub implements LoadRecipeById {
    async loadById (id: string): Promise<RecipeModel> {
      return Promise.resolve(makeFakeRecipe())
    }
  }
  return new LoadRecipeByIdStub()
}

interface SutTypes {
  loadRecipeByIdStub: LoadRecipeById
  sut: LoadRecipeController
}

const makeSut = (): SutTypes => {
  const loadRecipeByIdStub = makeLoadRecipeById()
  const sut = new LoadRecipeController(loadRecipeByIdStub)
  return { sut, loadRecipeByIdStub }
}

describe('LoadRecipe Controller', () => {
  test('should call loadRecipeById with correct values', async () => {
    const { sut, loadRecipeByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadRecipeByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return 403 if LoadRecipeById returns null', async () => {
    const { sut, loadRecipeByIdStub } = makeSut()
    jest.spyOn(loadRecipeByIdStub, 'loadById').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('recipeId')))
  })

  test('should return 500 if LoadRecipeById throws', async () => {
    const { sut, loadRecipeByIdStub } = makeSut()
    jest.spyOn(loadRecipeByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeRecipe()))
  })
})
