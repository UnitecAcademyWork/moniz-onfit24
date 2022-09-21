import { ServerError } from '@/presentation/errors'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { UpdateCategoryController } from './update-category-controller'
import { AddCategory, AddCategoryModel, CategoryModel, HttpRequest } from './update-category-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    img: 'any_img',
    description: 'any_description'
  },
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

const makeAddCategory = (): AddCategory => {
  class AddCategoryStub implements AddCategory {
    async add (category: AddCategoryModel): Promise<CategoryModel> {
      return Promise.resolve(makeFakeCategory())
    }
  }
  return new AddCategoryStub()
}

interface SutTypes {
  addCategoryStub: AddCategory
  sut: UpdateCategoryController
}

const makeSut = (): SutTypes => {
  const addCategoryStub = makeAddCategory()
  const sut = new UpdateCategoryController(addCategoryStub)
  return { sut, addCategoryStub }
}

describe('UpdateCategory Controller', () => {
  test('should call AddCategory with correct values', async () => {
    const { sut, addCategoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      img: 'any_img',
      description: 'any_description'
    }, 'any_id')
  })

  test('should return 500 if AddCategory throws', async () => {
    const { sut, addCategoryStub } = makeSut()
    jest.spyOn(addCategoryStub, 'add').mockImplementationOnce(async () => { return await Promise.reject(new Error()) })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeCategory()))
  })
})
