import { AddCategoryModel } from '@/domain/usecases/category/add-category'
import { TypeormHelper } from '../typeorm-helper'
import { CategoryRepository } from './category-repository'

describe('Category Repository', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

  const makeFakeCategory = (): AddCategoryModel => ({
    name: 'any_name',
    img: 'any_img',
    description: 'any_description'
  })

  const makeSut = (): CategoryRepository => {
    return new CategoryRepository()
  }

  describe('add()', () => {
    test('should return a category on add success', async () => {
      const sut = makeSut()
      const category = await sut.add(makeFakeCategory(), 'any_id')
      expect(category).toBeTruthy()
      expect(category.id).toBeTruthy()
      expect(category.name).toBe('any_name')
      expect(category.img).toBe('any_img')
      expect(category.description).toBe('any_description')
    })

    test('should update a category on add category with existing id', async () => {
      const sut = makeSut()
      const category = await sut.add(makeFakeCategory(), 'any_id')
      const updatedCategory = await sut.add({ name: 'other_name', description: '', img: '' }, category.id)
      expect(updatedCategory).toBeTruthy()
      expect(updatedCategory.id).toBeTruthy()
      expect(updatedCategory.name).toBe('other_name')
    })
  })

  describe('loadById()', () => {
    test('should return a category on loadById success', async () => {
      const sut = makeSut()
      const category = await sut.add(makeFakeCategory())
      const loadedCategory = await sut.loadById(category.id)
      expect(loadedCategory).toBeTruthy()
      expect(loadedCategory.id).toBeTruthy()
      expect(loadedCategory.name).toBe('any_name')
      expect(loadedCategory.img).toBe('any_img')
      expect(loadedCategory.description).toBe('any_description')
    })

    test('should return null if no category is found', async () => {
      const sut = makeSut()
      const loadedCategory = await sut.loadById('invalid_id')
      expect(loadedCategory).toBeNull()
    })
  })

  describe('loadAll()', () => {
    test('should load all categories on success', async () => {
      const sut = makeSut()
      await sut.add(makeFakeCategory())
      await sut.add(makeFakeCategory())
      const category = await sut.loadAll()
      expect(category.length).toBe(2)
      expect(category[0].name).toBe('any_name')
      expect(category[1].name).toBe('any_name')
    })

    test('should load empty list', async () => {
      const sut = makeSut()
      const categories = await sut.loadAll()
      expect(categories.length).toBe(0)
    })
  })

  describe('delete()', () => {
    test('should delete category on success', async () => {
      const sut = makeSut()
      await sut.add(makeFakeCategory(), 'any_id')
      const categories = await sut.delete('any_id')
      expect(categories).toBeTruthy()
    })

    test('should return null if no category is found', async () => {
      const sut = makeSut()
      const categories = await sut.delete('any_id')
      expect(categories).toBeNull()
    })
  })
})
