import { DbLoadCategories } from './load-all-categories'
import { CategoryModel, LoadCategoriesRepository } from './load-all-categories.protocols'

const makeFakeCategories = (): CategoryModel[] => ([{
  id: 'any_id',
  name: 'any_name',
  img: 'any_img',
  description: 'any_description'
},
{
  id: 'other_id',
  name: 'other_name',
  img: 'other_img',
  description: 'other_description'
}])

const makeLoadCategoriesRepository = (): LoadCategoriesRepository => {
  class LoadCategoriesRepositoryStub implements LoadCategoriesRepository {
    async loadAll (): Promise<CategoryModel[]> {
      return Promise.resolve(makeFakeCategories())
    }
  }
  return new LoadCategoriesRepositoryStub()
}

interface SutTypes {
  loadCategoriesRepositoryStub: LoadCategoriesRepository
  sut: DbLoadCategories
}

const makeSut = (): SutTypes => {
  const loadCategoriesRepositoryStub = makeLoadCategoriesRepository()
  const sut = new DbLoadCategories(loadCategoriesRepositoryStub)
  return { sut, loadCategoriesRepositoryStub }
}

describe('DbLoadCategories', () => {
  test('should call LoadCategoriesRepository', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCategoriesRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return a categories on success', async () => {
    const { sut } = makeSut()
    const categories = await sut.loadAll()
    expect(categories).toEqual(makeFakeCategories())
  })

  test('should throw if LoadCategoriesRepository throws', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    jest.spyOn(loadCategoriesRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })
})
