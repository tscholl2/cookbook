import { Recipe } from "src/model/api";
import { parseIngrediant } from "src/utils/parse-ingrediant";

export interface RecipeInput {
  name: string;
  ingrediants: string;
  time: string;
  directions: string;
  servings?: number;
  author: string;
}

export function inputToRecipe(input: RecipeInput): Recipe {
  const {
    name,
    author,
    servings = 1,
    directions,
    time: totalTime,
    ingrediants: rawIngrediants,
  } = input;
  return {
    name,
    author,
    servings,
    totalTime,
    images: [],
    directions,
    id: "new",
    ingredients: rawIngrediants ? rawIngrediants.split("\n").map(parseIngrediant) : [],
    lastEdited: new Date().toJSON(),
    datePublished: new Date().toJSON(),
  };
}
