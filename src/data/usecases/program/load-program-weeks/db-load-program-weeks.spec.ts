import { DbLoadProgramWeeks } from './db-load-program-weeks'
import { LoadProgramWeeksRepository, ProgramModel } from './db-load-program-weeks.protocols'

const makeFakeProgram = (): ProgramModel => ({
  id: 'any_id',
  url: 'any_url',
  name: 'any_name',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment']
})

const makeLoadProgramByIdRepository = (): LoadProgramWeeksRepository => {
  class LoadProgramWeeksRepositoryStub implements LoadProgramWeeksRepository {
    async loadProgramWeeks (programId: string): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new LoadProgramWeeksRepositoryStub()
}

interface SutTypes {
  loadProgramByIdRepositoryStub: LoadProgramWeeksRepository
  sut: DbLoadProgramWeeks
}

const makeSut = (): SutTypes => {
  const loadProgramByIdRepositoryStub = makeLoadProgramByIdRepository()
  const sut = new DbLoadProgramWeeks(loadProgramByIdRepositoryStub)

  return { sut, loadProgramByIdRepositoryStub }
}

describe('LoadProgramById', () => {
  test('should call LoadProgramByIdRepository with correct values', async () => {
    const { sut, loadProgramByIdRepositoryStub } = makeSut()
    const loadWeeksSpy = jest.spyOn(loadProgramByIdRepositoryStub, 'loadProgramWeeks')
    await sut.loadWeeks('any_id')
    expect(loadWeeksSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return a program on success', async () => {
    const { sut } = makeSut()
    const program = await sut.loadWeeks('any_id')
    expect(program).toEqual(makeFakeProgram())
  })

  test('should throw if LoadProgramByIdRepository throws', async () => {
    const { sut, loadProgramByIdRepositoryStub } = makeSut()
    jest.spyOn(loadProgramByIdRepositoryStub, 'loadProgramWeeks').mockRejectedValueOnce(new Error())
    const promise = sut.loadWeeks('any_id')
    await expect(promise).rejects.toThrow()
  })
})
