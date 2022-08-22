import { ObjectiveController } from './add-objective-controller'
import { AddObjective, AddObjectiveModel, HttpRequest, ObjectiveModel, Validation } from './add-objective-controller.protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { MissingParamError, ObjectiveInUseError, ServerError } from '../../errors'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    description: 'any_description',
    icon: 'any_icon'
  }
})

const makeFakeObjective = (): ObjectiveModel => ({
  id: 'valid_id',
  name: 'valid_name',
  description: 'valid_description',
  icon: 'valid_icon'
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddObjective = (): AddObjective => {
  class AddObjectiveStub implements AddObjective {
    async add (objective: AddObjectiveModel): Promise<ObjectiveModel> {
      const fakeObjective = makeFakeObjective()
      return await Promise.resolve(fakeObjective)
    }
  }
  return new AddObjectiveStub()
}

interface sutTypes {
  sut: ObjectiveController
  validationStub: Validation
  addObjectiveStub: AddObjective
}

const makeSut = (): sutTypes => {
  const validationStub = makeValidation()
  const addObjectiveStub = makeAddObjective()
  const sut = new ObjectiveController(validationStub, addObjectiveStub)
  return { sut, validationStub, addObjectiveStub }
}

describe('Objective Controller', () => {
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

  test('should call AddObjective with correct values', async () => {
    const { sut, addObjectiveStub } = makeSut()
    const addSpy = jest.spyOn(addObjectiveStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      description: 'any_description',
      icon: 'any_icon'
    })
  })

  test('should return 500 if AddObjective throws', async () => {
    const { sut, addObjectiveStub } = makeSut()
    jest.spyOn(addObjectiveStub, 'add').mockImplementationOnce(async () => { return await Promise.reject(new Error()) })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('should return 403 if AddObjective returns null', async () => {
    const { sut, addObjectiveStub } = makeSut()
    jest.spyOn(addObjectiveStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new ObjectiveInUseError()))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeObjective()))
  })
})
