import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadCategoryController } from './load-category-controller'
import { CategoryModel, HttpRequest, LoadCategoryById } from './load-category-controller.protocols'

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

const makeLoadCategoryById = (): LoadCategoryById => {
  class LoadCategoryByIdStub implements LoadCategoryById {
    async loadById (id: string): Promise<CategoryModel> {
      return Promise.resolve(makeFakeCategory())
    }
  }
  return new LoadCategoryByIdStub()
}

interface SutTypes {
  loadCategoryByIdStub: LoadCategoryById
  sut: LoadCategoryController
}

const makeSut = (): SutTypes => {
  const loadCategoryByIdStub = makeLoadCategoryById()
  const sut = new LoadCategoryController(loadCategoryByIdStub)
  return { sut, loadCategoryByIdStub }
}

describe('LoadCategory Controller', () => {
  test('should call LoadCategoryById with correct values', async () => {
    const { sut, loadCategoryByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadCategoryByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return 403 if LoadCategoryById returns null', async () => {
    const { sut, loadCategoryByIdStub } = makeSut()
    jest.spyOn(loadCategoryByIdStub, 'loadById').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('categoria inválida')))
  })

  test('should return 500 if LoadCategoryById throws', async () => {
    const { sut, loadCategoryByIdStub } = makeSut()
    jest.spyOn(loadCategoryByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeCategory()))
  })
})
