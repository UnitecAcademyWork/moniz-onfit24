import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadCategoriesController } from './load-all-categories-controller'
import { CategoryModel, LoadCategories } from './load-all-categories-controller.protocols'

const makeFakeCategories = (): CategoryModel[] => ([{
  id: 'any_id',
  name: 'any_name',
  img: 'any_img',
  description: 'any_description'
}, {
  id: 'any_id',
  name: 'any_name',
  img: 'any_img',
  description: 'any_description'
}])

const makeLoadCategories = (): LoadCategories => {
  class LoadCategoriesStub implements LoadCategories {
    async loadAll (): Promise<CategoryModel[]> {
      return Promise.resolve(makeFakeCategories())
    }
  }
  return new LoadCategoriesStub()
}

interface SutTypes {
  loadCategoriesStub: LoadCategories
  sut: LoadCategoriesController
}

const makeSut = (): SutTypes => {
  const loadCategoriesStub = makeLoadCategories()
  const sut = new LoadCategoriesController(loadCategoriesStub)
  return { sut, loadCategoriesStub }
}

describe('LoadCategories Controller', () => {
  test('should call LoadCategories', async () => {
    const { sut, loadCategoriesStub } = makeSut()
    const loadSpy = jest.spyOn(loadCategoriesStub, 'loadAll')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeCategories()))
  })

  test('should return 204 returns empty', async () => {
    const { sut, loadCategoriesStub } = makeSut()
    jest.spyOn(loadCategoriesStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if LoadCategories', async () => {
    const { sut, loadCategoriesStub } = makeSut()
    jest.spyOn(loadCategoriesStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
