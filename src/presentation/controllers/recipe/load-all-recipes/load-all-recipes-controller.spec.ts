import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadRecipesController } from './load-all-recipes-controller'
import { LoadRecipes, RecipeModel } from './load-all-recipes-controller.protocols'

const makeFakeRecipes = (): RecipeModel[] => ([{
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
}, {
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
}
])

const makeLoadRecipe = (): LoadRecipes => {
  class LoadRecipesStub implements LoadRecipes {
    async loadAll (): Promise<RecipeModel[]> {
      return Promise.resolve(makeFakeRecipes())
    }
  }
  return new LoadRecipesStub()
}

interface sutTypes {
  loadRecipesStub: LoadRecipes
  sut: LoadRecipesController
}

const makeSut = (): sutTypes => {
  const loadRecipesStub = makeLoadRecipe()
  const sut = new LoadRecipesController(loadRecipesStub)
  return { sut, loadRecipesStub }
}

describe('LoadRecipes Controller', () => {
  test('should call LoadRecipes', async () => {
    const { sut, loadRecipesStub } = makeSut()
    const loadSpy = jest.spyOn(loadRecipesStub, 'loadAll')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeRecipes()))
  })

  test('should return 204 returns empty', async () => {
    const { sut, loadRecipesStub } = makeSut()
    jest.spyOn(loadRecipesStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if LoadRecipes throws', async () => {
    const { sut, loadRecipesStub } = makeSut()
    jest.spyOn(loadRecipesStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
