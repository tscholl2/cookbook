import { Recipe } from "src/model/api";
import { parseIngrediant } from "src/utils/parse-ingrediant";
import { parseDirections } from "src/utils/parse-directions";

export interface RecipeInput {
  name: string;
  ingrediants: string;
  tags: string;
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
    tags = "",
    directions: rawDirections = "",
    time: totalTime,
    ingrediants: rawIngrediants = "",
  } = input;
  return {
    name,
    author,
    servings,
    totalTime,
    images: [],
    tags: tags
      .toLowerCase()
      .split(",")
      .map(s => s.trim())
      .filter(s => s),
    directions: parseDirections(rawDirections),
    id: "new",
    ingredients: rawIngrediants ? rawIngrediants.split("\n").map(parseIngrediant) : [],
    lastEdited: new Date().toJSON(),
    datePublished: new Date().toJSON(),
  };
}
