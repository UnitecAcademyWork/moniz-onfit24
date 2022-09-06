import { AddRecipeRepository } from '@/data/protocols/db/recipe/add-recipe-repository'
import { LoadRecipesRepository } from '@/data/protocols/db/recipe/load-all-recipes-repository'
import { LoadRecipeByIdRepository } from '@/data/protocols/db/recipe/load-recipe-repository'
import { RecipeModel } from '@/domain/models/recipe'
import { AddRecipeModel } from '@/domain/usecases/recipe/add-recipe'
import { Recipe } from '../entities/recipe'

export class RecipeRepository implements AddRecipeRepository, LoadRecipesRepository, LoadRecipeByIdRepository {
  async add (recipeData: AddRecipeModel): Promise<RecipeModel> {
    const recipe = new Recipe()
    recipe.cookTime = recipeData.cookTime
    recipe.description = recipeData.description
    recipe.difficulty = recipeData.difficulty
    recipe.ingredients = recipeData.ingredients
    recipe.name = recipeData.name
    recipe.nutrition = recipeData.nutrition
    recipe.prepTime = recipeData.prepTime
    recipe.serves = recipeData.serves
    recipe.steps = recipeData.steps
    recipe.tags = recipeData.tags
    recipe.url = recipeData.url
    const result = await Recipe.save(recipe)
    return result
  }

  async loadAll (): Promise<RecipeModel[]> {
    const recipe = await Recipe.find()
    return recipe
  }

  async loadById (id: string): Promise<RecipeModel> {
    const recipe = await Recipe.findOneBy({ id })
    return recipe
  }
}
