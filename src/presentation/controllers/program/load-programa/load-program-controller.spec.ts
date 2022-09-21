import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadProgramController } from './load-program-controller'
import { HttpRequest, LoadProgramById, ProgramModel } from './load-program-controller.protocols'

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

const makeLoadProgramById = (): LoadProgramById => {
  class LoadProgramByIdStub implements LoadProgramById {
    async loadById (id: string): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new LoadProgramByIdStub()
}

interface SutTypes {
  loadProgramByIdStub: LoadProgramById
  sut: LoadProgramController
}

const makeSut = (): SutTypes => {
  const loadProgramByIdStub = makeLoadProgramById()
  const sut = new LoadProgramController(loadProgramByIdStub)
  return { sut, loadProgramByIdStub }
}

describe('LoadProgram Controller', () => {
  test('should call LoadProgramById with correct values', async () => {
    const { sut, loadProgramByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadProgramByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return 403 if LoadProgramById returns null', async () => {
    const { sut, loadProgramByIdStub } = makeSut()
    jest.spyOn(loadProgramByIdStub, 'loadById').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('programa inválido')))
  })

  test('should return 500 if LoadProgramById throws', async () => {
    const { sut, loadProgramByIdStub } = makeSut()
    jest.spyOn(loadProgramByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeProgram()))
  })
})
