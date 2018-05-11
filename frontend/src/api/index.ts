import { Recipe } from "./types";
export * from "./types";

export interface IAPI {
  downloadAllRecipes(): Promise<{ [key: string]: Recipe }>;
  editRecipe(recipe: Recipe): Promise<Recipe>;
  newRecipe(recipe: Recipe): Promise<Recipe>;
  status(): Promise<{ uptime: string; version: string }>;
}

declare const require: any;
declare const process: any;
let API: IAPI;
if (process.env.NODE_ENV === "production") {
  API = require("./real").API;
} else {
  API = require("./fake").API;
}

export { API };
