import { DbDeleteProgramWeek } from './db-delete-program-week'
import { DeleteProgramWeekRepository, ProgramModel } from './db-delete-program-week.protocols'

const makeFakeProgram = (): ProgramModel => ({
  id: 'any_id',
  name: 'any_name',
  url: 'any_url',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment']
})

const makeDeleteProgramRepository = (): DeleteProgramWeekRepository => {
  class DeleteProgramWeekRepositoryStub implements DeleteProgramWeekRepository {
    async deleteAssociation (programId: string): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new DeleteProgramWeekRepositoryStub()
}

interface SutTypes {
  deleteProgramWeekRepositoryStub: DeleteProgramWeekRepository
  sut: DbDeleteProgramWeek
}

const makeSut = (): SutTypes => {
  const deleteProgramWeekRepositoryStub = makeDeleteProgramRepository()
  const sut = new DbDeleteProgramWeek(deleteProgramWeekRepositoryStub)

  return { sut, deleteProgramWeekRepositoryStub }
}

describe('DbDeleteProgram', () => {
  test('should call DeleteProgramWeekRepository with correct value', async () => {
    const { sut, deleteProgramWeekRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteProgramWeekRepositoryStub, 'deleteAssociation')
    await sut.deleteAssociation('any_program_id', 'any_week_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_program_id', 'any_week_id')
  })

  test('should return deleted program week association on success', async () => {
    const { sut } = makeSut()
    const program = await sut.deleteAssociation('any_program_id', 'any_week_id')
    expect(program).toEqual(makeFakeProgram())
  })

  test('should return null if DeleteProgramWeekRepository fails', async () => {
    const { sut, deleteProgramWeekRepositoryStub } = makeSut()
    jest.spyOn(deleteProgramWeekRepositoryStub, 'deleteAssociation').mockReturnValueOnce(null)
    const program = await sut.deleteAssociation('any_program_id', 'any_week_id')
    expect(program).toBeNull()
  })

  test('should throw if DeleteProgramWeekRepository throws', async () => {
    const { sut, deleteProgramWeekRepositoryStub } = makeSut()
    jest.spyOn(deleteProgramWeekRepositoryStub, 'deleteAssociation').mockRejectedValueOnce(new Error())
    const promise = sut.deleteAssociation('any_program_id', 'any_week_id')
    await expect(promise).rejects.toThrow()
  })
})
