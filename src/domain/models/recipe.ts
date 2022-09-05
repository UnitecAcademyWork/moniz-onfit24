export interface RecipeModel {
  id: string
  name: string
  description: string
  prepTime: string
  cookTime: string
  difficulty: string
  serves: string
  url: string
  nutrition: Nutrition
  tags: string[]
  ingredients: Ingredient[]
  steps: string[]
}

export interface Ingredient {
  name: string
  quantity: string
}

export interface Nutrition {
  kcal: string
  fat: string
  saturates: string
  carbs: string
  sugar: string
  fibre: string
  protein: string
  salt: string
}
