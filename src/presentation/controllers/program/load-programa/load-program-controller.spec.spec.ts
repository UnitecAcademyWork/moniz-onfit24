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
})
