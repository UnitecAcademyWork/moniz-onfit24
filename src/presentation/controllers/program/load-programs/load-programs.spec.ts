import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadPrograms, ProgramModel } from './load-program.protocols'
import { LoadProgramsController } from './load-programs'

const makeFakeProgram = (): ProgramModel[] => ([{
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment']
}, {
  id: 'other_id',
  name: 'other_name',
  description: 'other_description',
  difficulty: 'other_difficulty',
  duration: 'other_duration',
  objective: ['other_objective', 'other_objective'],
  equipment: ['other_equipment', 'other_equipment']
}])

const makeLoadPrograms = (): LoadPrograms => {
  class LoadProgramsStub implements LoadPrograms {
    async load (): Promise<ProgramModel[]> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new LoadProgramsStub()
}

interface sutTypes {
  loadProgramsStub: LoadPrograms
  sut: LoadProgramsController
}

const makeSut = (): sutTypes => {
  const loadProgramsStub = makeLoadPrograms()
  const sut = new LoadProgramsController(loadProgramsStub)
  return { sut, loadProgramsStub }
}

describe('LoadPrograms Controller', () => {
  test('should call LoadPrograms', async () => {
    const { sut, loadProgramsStub } = makeSut()
    const loadSpy = jest.spyOn(loadProgramsStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeProgram()))
  })

  test('should return 204 returns empty', async () => {
    const { sut, loadProgramsStub } = makeSut()
    jest.spyOn(loadProgramsStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if LoadObjectives', async () => {
    const { sut, loadProgramsStub } = makeSut()
    jest.spyOn(loadProgramsStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
