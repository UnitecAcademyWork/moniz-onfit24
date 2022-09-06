import { DbLoadRecipeById } from './db-load-recipe-by-id'
import { LoadRecipeByIdRepository, RecipeModel } from './db-load-recipe-by-id.protocols'

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

const makeLoadRecipeByIdRepository = (): LoadRecipeByIdRepository => {
  class LoadRecipeByIdRepositoryStub implements LoadRecipeByIdRepository {
    async loadById (id: string): Promise<RecipeModel> {
      return Promise.resolve(makeFakeRecipe())
    }
  }
  return new LoadRecipeByIdRepositoryStub()
}

interface SutTypes {
  loadRecipeByIdRepositoryStub: LoadRecipeByIdRepository
  sut: DbLoadRecipeById
}

const makeSut = (): SutTypes => {
  const loadRecipeByIdRepositoryStub = makeLoadRecipeByIdRepository()
  const sut = new DbLoadRecipeById(loadRecipeByIdRepositoryStub)
  return { sut, loadRecipeByIdRepositoryStub }
}

describe('LoadRecipeById', () => {
  test('should call LoadRecipeByIdRepository with correct values', async () => {
    const { sut, loadRecipeByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadRecipeByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return a recipe on success', async () => {
    const { sut } = makeSut()
    const recipe = await sut.loadById('any_id')
    expect(recipe).toEqual(makeFakeRecipe())
  })

  test('should throw if LoadRecipeByIdRepository throws', async () => {
    const { sut, loadRecipeByIdRepositoryStub } = makeSut()
    jest.spyOn(loadRecipeByIdRepositoryStub, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
