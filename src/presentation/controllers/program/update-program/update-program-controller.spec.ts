import { ProgramModel } from '@/domain/models/program'
import { AddProgramModel } from '@/domain/usecases/program/add-program'
import { InvalidParamError, ServerError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { UpdateProgramController } from './update-program-controller'
import { AddProgram, HttpRequest } from './update-program-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    description: 'any_description',
    difficulty: 'any_difficulty',
    duration: 'any_duration',
    objective: ['any_objective', 'other_objective'],
    equipment: ['any_equipment', 'other_equipment']
  },
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
  equipment: ['any_equipment', 'other_equipment'],
  objective: ['any_objective', 'other_objective']
})

const makeAddProgram = (): AddProgram => {
  class AddProgramStub implements AddProgram {
    async add (programa: AddProgramModel, programId: string): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }

  return new AddProgramStub()
}

interface SutTypes {
  addProgramStub: AddProgram
  sut: UpdateProgramController
}

const makeSut = (): SutTypes => {
  const addProgramStub = makeAddProgram()
  const sut = new UpdateProgramController(addProgramStub)
  return { sut, addProgramStub }
}

describe('Update Program Controller', () => {
  test('should call AddProgram with correct values', async () => {
    const { sut, addProgramStub } = makeSut()
    const addSpy = jest.spyOn(addProgramStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      description: 'any_description',
      difficulty: 'any_difficulty',
      duration: 'any_duration',
      objective: ['any_objective', 'other_objective'],
      equipment: ['any_equipment', 'other_equipment']
    }, 'any_id')
  })

  test('should return 403 if LoadProgramById returns null', async () => {
    const { sut, addProgramStub } = makeSut()
    jest.spyOn(addProgramStub, 'add').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('programId')))
  })

  test('should return 500 if AddProgram throws', async () => {
    const { sut, addProgramStub } = makeSut()
    jest.spyOn(addProgramStub, 'add').mockImplementationOnce(async () => { return await Promise.reject(new Error()) })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeProgram()))
  })
})
