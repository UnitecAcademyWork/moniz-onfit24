import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { DeleteRecipeController } from './delete-recipe-controller'
import { DeleteRecipe, HttpRequest, RecipeModel } from './delete-recipe-controller.protocols'

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

const makeDeleteRecipe = (): DeleteRecipe => {
  class DeleteRecipeStub implements DeleteRecipe {
    async delete (id: string): Promise<RecipeModel> {
      return Promise.resolve(makeFakeRecipe())
    }
  }
  return new DeleteRecipeStub()
}

interface SutTypes {
  deleteRecipeStub: DeleteRecipe
  sut: DeleteRecipeController
}

const makeSut = (): SutTypes => {
  const deleteRecipeStub = makeDeleteRecipe()
  const sut = new DeleteRecipeController(deleteRecipeStub)

  return { sut, deleteRecipeStub }
}

describe('DeleteRecipe Controller', () => {
  test('should call DeleteRecipe with correct value', async () => {
    const { sut, deleteRecipeStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteRecipeStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return 403 DeleteRecipe returns null', async () => {
    const { sut, deleteRecipeStub } = makeSut()
    jest.spyOn(deleteRecipeStub, 'delete').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('recipeId')))
  })

  test('should return 500 if DeleteRecipe throws', async () => {
    const { sut, deleteRecipeStub } = makeSut()
    jest.spyOn(deleteRecipeStub, 'delete').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
