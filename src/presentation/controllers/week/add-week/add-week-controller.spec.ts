import { AddWeekController } from './add-week-controller'
import { AddWeek, AddWeekModel, HttpRequest, Validation, WeekModel } from './add-week-controller.protocols'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'

const makeFakeWeek = (): WeekModel => ({
  id: 'any_id',
  programId: 'program_id',
  goals: ['any_goal', 'other_goal'],
  exercises: [{
    duration: 'any_duration',
    title: 'any_title',
    uri: 'any_uri',
    url: 'any_url'
  }]
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    programId: 'program_id',
    goals: ['any_goal', 'other_goal'],
    exercises: [{
      duration: 'any_duration',
      title: 'any_title',
      uri: 'any_uri',
      url: 'any_url'
    }]
  },
  params: {
    weekId: 'any_id'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddWeek = (): AddWeek => {
  class AddWeekStub implements AddWeek {
    async add (weekData: AddWeekModel): Promise<WeekModel> {
      return Promise.resolve(makeFakeWeek())
    }
  }

  return new AddWeekStub()
}

interface SutTypes {
  validationStub: Validation
  addWeekStub: AddWeek
  sut: AddWeekController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addWeekStub = makeAddWeek()
  const sut = new AddWeekController(validationStub, addWeekStub)
  return { sut, validationStub, addWeekStub }
}

describe('AddWeek Controller', () => {
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

  test('should call addWeek with correct values', async () => {
    const { sut, addWeekStub } = makeSut()
    const addSpy = jest.spyOn(addWeekStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      programId: 'program_id',
      goals: ['any_goal', 'other_goal'],
      exercises: [{
        duration: 'any_duration',
        title: 'any_title',
        uri: 'any_uri',
        url: 'any_url'
      }]
    }, 'any_id')
  })

  test('should return 500 if AddProgram throws', async () => {
    const { sut, addWeekStub } = makeSut()
    jest.spyOn(addWeekStub, 'add').mockImplementationOnce(async () => { return await Promise.reject(new Error()) })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })
})
