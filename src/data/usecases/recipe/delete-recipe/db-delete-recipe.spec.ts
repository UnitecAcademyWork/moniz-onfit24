import { DbDeleteRecipe } from './db-delete-recipe'
import { DeleteRecipeRepository, RecipeModel } from './db-delete-recipe.protocols'

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

const makeDeleteRecipeRepository = (): DeleteRecipeRepository => {
  class DeleteRecipeRepositoryStub implements DeleteRecipeRepository {
    async delete (id: string): Promise<RecipeModel> {
      return Promise.resolve(makeFakeRecipe())
    }
  }
  return new DeleteRecipeRepositoryStub()
}

interface SutTypes {
  deleteRecipeRepositoryStub: DeleteRecipeRepository
  sut: DbDeleteRecipe
}

const makeSut = (): SutTypes => {
  const deleteRecipeRepositoryStub = makeDeleteRecipeRepository()
  const sut = new DbDeleteRecipe(deleteRecipeRepositoryStub)
  return { sut, deleteRecipeRepositoryStub }
}

describe('DbDeleteRecipe', () => {
  test('should call DeleteRecipeRepository with correct value', async () => {
    const { sut, deleteRecipeRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteRecipeRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return deleted Recipe on success', async () => {
    const { sut } = makeSut()
    const recipe = await sut.delete('any_id')
    expect(recipe).toEqual(makeFakeRecipe())
  })

  test('should return null if DeleteRecipeRepository fails', async () => {
    const { sut, deleteRecipeRepositoryStub } = makeSut()
    jest.spyOn(deleteRecipeRepositoryStub, 'delete').mockReturnValueOnce(null)
    const recipe = await sut.delete('any_id')
    expect(recipe).toBeNull()
  })

  test('should throw if DeleteRecipeRepository throws', async () => {
    const { sut, deleteRecipeRepositoryStub } = makeSut()
    jest.spyOn(deleteRecipeRepositoryStub, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.delete('any_id')
    await expect(promise).rejects.toThrow()
  })
})
