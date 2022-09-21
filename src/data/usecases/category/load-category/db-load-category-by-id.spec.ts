import { DbLoadCategoryById } from './db-load-category-b-id'
import { CategoryModel, LoadCategoryByIdRepository } from './db-load-category-by-id.protocols'

const makeFakeCategory = (): CategoryModel => ({
  id: 'any_id',
  name: 'any_name',
  img: 'any_img',
  description: 'any_description'
})

const makeLoadCategoryByIdRepository = (): LoadCategoryByIdRepository => {
  class LoadCategoryByIdRepositoryStub implements LoadCategoryByIdRepository {
    async loadById (id: string): Promise<CategoryModel> {
      return Promise.resolve(makeFakeCategory())
    }
  }
  return new LoadCategoryByIdRepositoryStub()
}

interface SutTypes {
  loadCategoryByIdRepositoryStub: LoadCategoryByIdRepository
  sut: DbLoadCategoryById
}

const makeSut = (): SutTypes => {
  const loadCategoryByIdRepositoryStub = makeLoadCategoryByIdRepository()
  const sut = new DbLoadCategoryById(loadCategoryByIdRepositoryStub)
  return { sut, loadCategoryByIdRepositoryStub }
}

describe('DbLoadCategoryById', () => {
  test('should call LoadCategoryByIdRepository with correct value', async () => {
    const { sut, loadCategoryByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadCategoryByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return a category on success', async () => {
    const { sut } = makeSut()
    const category = await sut.loadById('any_id')
    expect(category).toEqual(makeFakeCategory())
  })

  test('should throw if LoadCategoryByIdRepository throws', async () => {
    const { sut, loadCategoryByIdRepositoryStub } = makeSut()
    jest.spyOn(loadCategoryByIdRepositoryStub, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
