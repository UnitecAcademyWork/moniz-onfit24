import { DbAddRecipe } from './db-add-recipe'
import { AddRecipeModel, AddRecipeRepository, RecipeModel } from './db-add-recipe.protocols'

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

const makeAddRecipeRepository = (): AddRecipeRepository => {
  class AddRecipeRepositoryStub implements AddRecipeRepository {
    async add (RecipeData: AddRecipeModel): Promise<RecipeModel> {
      return await Promise.resolve(makeFakeRecipe())
    }
  }
  return new AddRecipeRepositoryStub()
}

interface SutTypes {
  sut: DbAddRecipe
  addRecipeRepositoryStub: AddRecipeRepository
}

const makeSut = (): SutTypes => {
  const addRecipeRepositoryStub = makeAddRecipeRepository()
  const sut = new DbAddRecipe(addRecipeRepositoryStub)
  return { sut, addRecipeRepositoryStub }
}

describe('DbAddRecipe', () => {
  test('should call addRecipeRepository with correct values', async () => {
    const { sut, addRecipeRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addRecipeRepositoryStub, 'add')
    await sut.add(makeFakeRecipeData())
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
})
