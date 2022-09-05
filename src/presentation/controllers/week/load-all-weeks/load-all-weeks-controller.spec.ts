import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadWeeksController } from './load-all-weeks-controller'
import { LoadWeeks, WeekModel } from './load-all-weeks-controller.protocols'

const makeFakeWeeks = (): WeekModel[] => ([{
  id: 'any_id',
  goals: ['any_goal', 'other_goal'],
  exercises: [{
    duration: 'any_duration',
    title: 'any_title',
    uri: 'any_uri',
    url: 'any_url'
  }]
},
{
  id: 'other_id',
  goals: ['other_goal', 'other_goal'],
  exercises: [{
    duration: 'other_duration',
    title: 'other_title',
    uri: 'other_uri',
    url: 'other_url'
  }]
}])

const makeLoadWeeks = (): LoadWeeks => {
  class LoadWeeksStub implements LoadWeeks {
    async loadAll (): Promise<WeekModel[]> {
      return Promise.resolve(makeFakeWeeks())
    }
  }
  return new LoadWeeksStub()
}

interface SutTypes {
  loadWeeksStub: LoadWeeks
  sut: LoadWeeksController
}

const makeSut = (): SutTypes => {
  const loadWeeksStub = makeLoadWeeks()
  const sut = new LoadWeeksController(loadWeeksStub)
  return { sut, loadWeeksStub }
}

describe('LoadWeeks Controller', () => {
  test('should call LoadWeeks', async () => {
    const { sut, loadWeeksStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadWeeksStub, 'loadAll')
    await sut.handle({})
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeWeeks()))
  })

  test('should return 204 returns empty', async () => {
    const { sut, loadWeeksStub } = makeSut()
    jest.spyOn(loadWeeksStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if LoadWeeks throws', async () => {
    const { sut, loadWeeksStub } = makeSut()
    jest.spyOn(loadWeeksStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
