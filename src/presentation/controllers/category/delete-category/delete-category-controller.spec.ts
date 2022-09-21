import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { DeleteCategoryController } from './delete-category-controller'
import { CategoryModel, DeleteCategory, HttpRequest } from './delete-category-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    categoryId: 'any_id'
  }
})

const makeFakeCategory = (): CategoryModel => ({
  id: 'any_id',
  name: 'any_name',
  img: 'any_img',
  description: 'any_description'
})

const makeDeleteCategory = (): DeleteCategory => {
  class DeleteCategoryStub implements DeleteCategory {
    async delete (id: string): Promise<CategoryModel> {
      return Promise.resolve(makeFakeCategory())
    }
  }
  return new DeleteCategoryStub()
}

interface SutTypes {
  deleteCategoryStub: DeleteCategory
  sut: DeleteCategoryController
}

const makeSut = (): SutTypes => {
  const deleteCategoryStub = makeDeleteCategory()
  const sut = new DeleteCategoryController(deleteCategoryStub)
  return { sut, deleteCategoryStub }
}

describe('DeleteCategory Controller', () => {
  test('should call DeleteCategory with correct value', async () => {
    const { sut, deleteCategoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteCategoryStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return 403 DeleteCategory returns null', async () => {
    const { sut, deleteCategoryStub } = makeSut()
    jest.spyOn(deleteCategoryStub, 'delete').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('categoria inválida')))
  })

  test('should return 500 if DeleteCategory throws', async () => {
    const { sut, deleteCategoryStub } = makeSut()
    jest.spyOn(deleteCategoryStub, 'delete').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
