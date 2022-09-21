import { DbDeleteCategory } from './db-delete-category'
import { CategoryModel, DeleteCategoryRepository } from './db-delete-category.protocols'

const makeFakeCategory = (): CategoryModel => ({
  id: 'any_id',
  name: 'any_name',
  img: 'any_img',
  description: 'any_description'
})

const makeDeleteCategoryRepository = (): DeleteCategoryRepository => {
  class DeleteCategoryRepositoryStub implements DeleteCategoryRepository {
    async delete (id: string): Promise<CategoryModel> {
      return Promise.resolve(makeFakeCategory())
    }
  }
  return new DeleteCategoryRepositoryStub()
}

interface SutTypes {
  deleteCategoryRepositoryStub: DeleteCategoryRepository
  sut: DbDeleteCategory
}

const makeSut = (): SutTypes => {
  const deleteCategoryRepositoryStub = makeDeleteCategoryRepository()
  const sut = new DbDeleteCategory(deleteCategoryRepositoryStub)

  return { sut, deleteCategoryRepositoryStub }
}

describe('DbDeleteCategory', () => {
  test('should call DeleteCategoryRepository with correct value', async () => {
    const { sut, deleteCategoryRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteCategoryRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return deleted category on success', async () => {
    const { sut } = makeSut()
    const category = await sut.delete('any_id')
    expect(category).toEqual(makeFakeCategory())
  })

  test('should return null if DeleteCategoryRepository fails', async () => {
    const { sut, deleteCategoryRepositoryStub } = makeSut()
    jest.spyOn(deleteCategoryRepositoryStub, 'delete').mockReturnValueOnce(null)
    const category = await sut.delete('any_id')
    expect(category).toBeNull()
  })

  test('should throw if DeleteCategoryRepository throws', async () => {
    const { sut, deleteCategoryRepositoryStub } = makeSut()
    jest.spyOn(deleteCategoryRepositoryStub, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.delete('any_id')
    await expect(promise).rejects.toThrow()
  })
})
