import { Recipe } from "./types";
export * from "./types";

export interface IAPI {
  downloadAllRecipes(): Promise<{ [key: string]: Recipe }>;
  editRecipe(recipe: Recipe): Promise<Recipe>;
  newRecipe(recipe: Recipe): Promise<Recipe>;
  status(): Promise<{ uptime: string }>;
}

export { API } from "./fake";
