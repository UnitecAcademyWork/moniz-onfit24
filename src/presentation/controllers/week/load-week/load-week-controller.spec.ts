import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadWeekController } from './load-week-controller'
import { HttpRequest, LoadWeekById, WeekModel } from './load-week-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    weekId: 'any_id'
  }
})

const makeFakeWeek = (): WeekModel => ({
  id: 'any_id',
  goals: ['any_goal', 'other_goal'],
  exercises: [{
    duration: 'any_duration',
    title: 'any_title',
    uri: 'any_uri',
    url: 'any_url'
  }]
})

const makeLoadWeekById = (): LoadWeekById => {
  class LoadWeekByIdStub implements LoadWeekById {
    async loadById (weekId: string): Promise<WeekModel> {
      return Promise.resolve(makeFakeWeek())
    }
  }
  return new LoadWeekByIdStub()
}

interface SutTypes {
  loadWeekByIdStub: LoadWeekById
  sut: LoadWeekController
}

const makeSut = (): SutTypes => {
  const loadWeekByIdStub = makeLoadWeekById()
  const sut = new LoadWeekController(loadWeekByIdStub)
  return { sut, loadWeekByIdStub }
}

describe('LoadWeek Controller', () => {
  test('should call LoadWeekById with correct value', async () => {
    const { sut, loadWeekByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadWeekByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return 403 if LoadWeekById return null', async () => {
    const { sut, loadWeekByIdStub } = makeSut()
    jest.spyOn(loadWeekByIdStub, 'loadById').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('Treino inválido')))
  })

  test('should return 500 if LoadWeekById throws', async () => {
    const { sut, loadWeekByIdStub } = makeSut()
    jest.spyOn(loadWeekByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeWeek()))
  })
})
