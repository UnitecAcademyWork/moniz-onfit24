import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadProgramWeeksController } from './load-program-weeks-controller'
import { HttpRequest, LoadProgramWeeks, ProgramModel } from './load-program-weeks-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    programId: 'any_id'
  }
})

const makeFakeProgram = (): ProgramModel => ({
  id: 'any_id',
  name: 'any_name',
  url: 'any_url',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective']
})

const makeLoadProgramById = (): LoadProgramWeeks => {
  class LoadProgramWeeksStub implements LoadProgramWeeks {
    async loadWeeks (id: string): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new LoadProgramWeeksStub()
}

interface SutTypes {
  loadProgramWeeksStub: LoadProgramWeeks
  sut: LoadProgramWeeksController
}

const makeSut = (): SutTypes => {
  const loadProgramWeeksStub = makeLoadProgramById()
  const sut = new LoadProgramWeeksController(loadProgramWeeksStub)
  return { sut, loadProgramWeeksStub }
}

describe('LoadProgram Controller', () => {
  test('should call LoadProgramWeeks with correct values', async () => {
    const { sut, loadProgramWeeksStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadProgramWeeksStub, 'loadWeeks')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return 403 if LoadProgramWeeks returns null', async () => {
    const { sut, loadProgramWeeksStub } = makeSut()
    jest.spyOn(loadProgramWeeksStub, 'loadWeeks').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('programId')))
  })

  test('should return 500 if LoadProgramWeeks throws', async () => {
    const { sut, loadProgramWeeksStub } = makeSut()
    jest.spyOn(loadProgramWeeksStub, 'loadWeeks').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeProgram()))
  })
})
