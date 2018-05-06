import { Recipe } from "src/api";
import { parseIngrediant } from "src/utils/parse-ingrediant";
import { parseDirections } from "src/utils/parse-directions";

export interface RecipeFormValues {
  id: string;
  name: string;
  ingrediants: string;
  tags: string;
  time: string;
  directions: string;
  servings?: number;
  images: string[];
  author: string;
}

export function recipeToFormValues(recipe: Recipe): RecipeFormValues {
  return {
    id: recipe.id,
    name: recipe.name,
    servings: recipe.servings,
    time: recipe.totalTime,
    tags: recipe.tags.join(", "),
    author: recipe.author,
    ingrediants: recipe.ingredients.map(i => `${i.amount} ${i.measurement} ${i.name}`).join("\n"),
    directions: recipe.directions.map((l, i) => `${i + 1}. ${l}`).join("\n"),
    images: recipe.images,
  };
}

export function formValuesToRecipe(input: RecipeFormValues): Recipe {
  const {
    id = "",
    name = "",
    author = "",
    servings = 1,
    tags = "",
    directions: rawDirections = "",
    time: totalTime,
    ingrediants: rawIngrediants = "",
    images,
  } = input;
  return {
    id,
    name,
    author,
    servings,
    totalTime,
    images,
    tags: tags
      .toLowerCase()
      .split(",")
      .map(s => s.trim())
      .filter(s => s),
    directions: parseDirections(rawDirections),
    ingredients: rawIngrediants ? rawIngrediants.split("\n").map(parseIngrediant) : [],
    lastEdited: new Date().toJSON(),
    datePublished: new Date().toJSON(),
  };
}
