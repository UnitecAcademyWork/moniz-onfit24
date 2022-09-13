import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { DeleteProgramWeekController } from './delete-program-week-controller'
import { DeleteProgramWeek, HttpRequest, ProgramModel, Validation } from './delete-program-week.protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    programId: 'any_program_id',
    weekId: 'any_week_id'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeProgram = (): ProgramModel => ({
  id: 'any_id',
  name: 'any_name',
  url: 'any_url',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective']
})

const makeDeleteProgramWeek = (): DeleteProgramWeek => {
  class DeleteProgramWeekStub implements DeleteProgramWeek {
    async deleteAssociation (programId: string, weekId): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new DeleteProgramWeekStub()
}

interface SutTypes {
  deleteProgramWeekStub: DeleteProgramWeek
  validationStub: Validation
  sut: DeleteProgramWeekController
}

const makeSut = (): SutTypes => {
  const deleteProgramWeekStub = makeDeleteProgramWeek()
  const validationStub = makeValidation()
  const sut = new DeleteProgramWeekController(validationStub, deleteProgramWeekStub)

  return { sut, deleteProgramWeekStub, validationStub }
}

describe('DeleteProgramWeek Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
  test('should call DeleteProgramWeek with correct value', async () => {
    const { sut, deleteProgramWeekStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteProgramWeekStub, 'deleteAssociation')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_program_id', 'any_week_id')
  })

  test('should return 403 DeleteProgramWeek returns null', async () => {
    const { sut, deleteProgramWeekStub } = makeSut()
    jest.spyOn(deleteProgramWeekStub, 'deleteAssociation').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('programId')))
  })

  test('should return 500 if DeleteProgramWeek throws', async () => {
    const { sut, deleteProgramWeekStub } = makeSut()
    jest.spyOn(deleteProgramWeekStub, 'deleteAssociation').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
