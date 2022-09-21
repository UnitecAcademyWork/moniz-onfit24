import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddCategory, AddCategoryModel, CategoryModel, HttpRequest, Validation } from './add-category-controller.protocols'
import { AddCategoryController } from './add-category-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    img: 'any_img',
    description: 'any_description'
  }
})

const makeFakeCategory = (): CategoryModel => ({
  id: 'any_id',
  name: 'any_name',
  img: 'any_img',
  description: 'any_description'
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddCategory = (): AddCategory => {
  class AddCategoryStub implements AddCategory {
    async add (category: AddCategoryModel): Promise<CategoryModel> {
      return Promise.resolve(makeFakeCategory())
    }
  }
  return new AddCategoryStub()
}

interface SutTypes {
  validationStub: Validation
  addCategoryStub: AddCategory
  sut: AddCategoryController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addCategoryStub = makeAddCategory()
  const sut = new AddCategoryController(validationStub, addCategoryStub)
  return { sut, validationStub, addCategoryStub }
}

describe('AddCategory Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should call AddCategory with correct values', async () => {
    const { sut, addCategoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      img: 'any_img',
      description: 'any_description'
    })
  })

  test('should return 500 if AddProgram throws', async () => {
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
