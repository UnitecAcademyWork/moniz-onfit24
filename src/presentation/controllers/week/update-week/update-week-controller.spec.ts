import { UpdateWeekController } from './update-week-controller'
import { AddWeek, AddWeekModel, HttpRequest, WeekModel } from './update-week-controller.protocols'
import { InvalidParamError, ServerError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'

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

const makeAddWeek = (): AddWeek => {
  class AddWeekStub implements AddWeek {
    async add (weekData: AddWeekModel): Promise<WeekModel> {
      return Promise.resolve(makeFakeWeek())
    }
  }

  return new AddWeekStub()
}

interface SutTypes {
  addWeekStub: AddWeek
  sut: UpdateWeekController
}

const makeSut = (): SutTypes => {
  const addWeekStub = makeAddWeek()
  const sut = new UpdateWeekController(addWeekStub)
  return { sut, addWeekStub }
}

describe('AddWeek Controller', () => {
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

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeWeek()))
  })

  test('should return 403 if invalid programId is provided', async () => {
    const { sut, addWeekStub } = makeSut()
    jest.spyOn(addWeekStub, 'add').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('programId')))
  })
})
