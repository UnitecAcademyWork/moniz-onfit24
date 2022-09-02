import { DbAddWeekToProgram } from './db-add-week-to-program'
import { AddWeekToProgramRepository, ProgramModel } from './db-add-week-to-program.protocols'

const makeFakeProgram = (): ProgramModel => ({
  id: 'any_id',
  url: 'any_url',
  name: 'any_name',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment'],
  weeks: [
    {
      id: 'exercise_id',
      goals: ['any_goal'],
      exercises: [{
        duration: 'any_duration',
        title: 'any_title',
        uri: 'any_uri',
        url: 'any_url'
      }]
    }
  ]
})

const makeAddWeekToProgramRepository = (): AddWeekToProgramRepository => {
  class AddWeekToProgramRepositoryStub implements AddWeekToProgramRepository {
    async associate (programId: string, weekId: string): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new AddWeekToProgramRepositoryStub()
}

interface SutTypes {
  addWeekToProgramRepositoryStub: AddWeekToProgramRepository
  sut: DbAddWeekToProgram
}

const makeSut = (): SutTypes => {
  const addWeekToProgramRepositoryStub = makeAddWeekToProgramRepository()
  const sut = new DbAddWeekToProgram(addWeekToProgramRepositoryStub)
  return { sut, addWeekToProgramRepositoryStub }
}

describe('DbAddWeekToProgram', () => {
  test('should call AddWeekToProgramRepository with correct values', async () => {
    const { sut, addWeekToProgramRepositoryStub } = makeSut()
    const associateSpy = jest.spyOn(addWeekToProgramRepositoryStub, 'associate')
    await sut.associate('program_id', 'week_id')
    expect(associateSpy).toHaveBeenCalledWith('program_id', 'week_id')
  })

  test('should return a program on associate success', async () => {
    const { sut } = makeSut()
    const program = await sut.associate('program_id', 'week_id')
    expect(program).toEqual(makeFakeProgram())
  })
})
