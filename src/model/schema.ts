export type RECIPE = {
    id: 1,
    name: string,
    ingredients: string[],
    instructions: string[],
    prepTimeMinutes: number,
    cookTimeMinutes: number,
    servings: number,
    difficulty: DIFFICULTY,
    cuisine: string,
    caloriesPerServing: number,
    tags: string[],
    userId: number,
    image: string,
    rating: number,
    reviewCount: number,
    mealType: string[]
}

enum DIFFICULTY {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard",
}

export type RESULT = {
    recipes: RECIPE[],
    skip: number,
    total: number,
    limit: number
}