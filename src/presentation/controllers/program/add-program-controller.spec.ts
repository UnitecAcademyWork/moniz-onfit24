import { ProgramModel } from '@/domain/models/program'
import { AddProgramModel } from '@/domain/usecases/add-programa'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { AddProgramController } from './add-program-controller'
import { AddProgram, HttpRequest, Validation } from './add-program-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    description: 'any_description',
    difficulty: 'any_difficulty',
    duration: 'any_duration',
    objective: ['any_objective', 'other_objective']
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

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddProgram = (): AddProgram => {
  class AddProgramStub implements AddProgram {
    async add (programa: AddProgramModel): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }

  return new AddProgramStub()
}

interface SutTypes {
  addProgramStub: AddProgram
  validationStub: Validation
  sut: AddProgramController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addProgramStub = makeAddProgram()
  const sut = new AddProgramController(validationStub, addProgramStub)
  return { sut, validationStub, addProgramStub }
}

describe('Add Program Controller', () => {
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

  test('should call AddProgram with correct values', async () => {
    const { sut, addProgramStub } = makeSut()
    const addSpy = jest.spyOn(addProgramStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      description: 'any_description',
      difficulty: 'any_difficulty',
      duration: 'any_duration',
      objective: ['any_objective', 'other_objective']
    })
  })
})
