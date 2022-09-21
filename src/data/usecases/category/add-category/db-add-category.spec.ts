import { DbAddCategory } from './db-add-category'
import { AddCategoryModel, AddCategoryRepository, CategoryModel } from './db-add-category.protocols'

const makeFakeCategory = (): CategoryModel => ({
  id: 'any_id',
  name: 'any_name',
  img: 'any_img',
  description: 'any_description'
})

const makeFakeCategoryData = (): AddCategoryModel => ({
  name: 'any_name',
  img: 'any_img',
  description: 'any_description'
})

const makeAddCategoryRepository = (): AddCategoryRepository => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (categoryData: AddCategoryModel): Promise<CategoryModel> {
      return Promise.resolve(makeFakeCategory())
    }
  }
  return new AddCategoryRepositoryStub()
}

interface SutTypes {
  addCategoryRepositoryStub: AddCategoryRepository
  sut: DbAddCategory
}

const makeSut = (): SutTypes => {
  const addCategoryRepositoryStub = makeAddCategoryRepository()
  const sut = new DbAddCategory(addCategoryRepositoryStub)
  return { sut, addCategoryRepositoryStub }
}

describe('DbAddCategory', () => {
  test('should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryRepositoryStub, 'add')
    await sut.add(makeFakeCategoryData(), 'any_id')
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      img: 'any_img',
      description: 'any_description'
    }, 'any_id')
  })

  test('should return a category on success', async () => {
    const { sut } = makeSut()
    const category = await sut.add(makeFakeCategoryData(), 'any_id')
    expect(category).toEqual(makeFakeCategory())
  })
})
