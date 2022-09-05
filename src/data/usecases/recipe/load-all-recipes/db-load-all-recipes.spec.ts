import { DbLoadRecipes } from './db-load-all-recipes'
import { LoadRecipesRepository, RecipeModel } from './db-load-all-recipes.protocols'

const makeFakeRecipe = (): RecipeModel[] => ([{
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
}])

const makeLoadRecipesRepository = (): LoadRecipesRepository => {
  class LoadRecipesRepositoryStub implements LoadRecipesRepository {
    async loadAll (): Promise<RecipeModel[]> {
      return Promise.resolve(makeFakeRecipe())
    }
  }
  return new LoadRecipesRepositoryStub()
}

interface SutTypes {
  loadRecipesRepositoryStub: LoadRecipesRepository
  sut: DbLoadRecipes
}

const makeSut = (): SutTypes => {
  const loadRecipesRepositoryStub = makeLoadRecipesRepository()
  const sut = new DbLoadRecipes(loadRecipesRepositoryStub)

  return { sut, loadRecipesRepositoryStub }
}

describe('LoadRecipeById', () => {
  test('should call LoadRecipesRepository', async () => {
    const { sut, loadRecipesRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadRecipesRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return a recipe on success', async () => {
    const { sut } = makeSut()
    const recipe = await sut.loadAll()
    expect(recipe).toEqual(makeFakeRecipe())
  })

  test('should throw if LoadRecipesRepository throws', async () => {
    const { sut, loadRecipesRepositoryStub } = makeSut()
    jest.spyOn(loadRecipesRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })
})
