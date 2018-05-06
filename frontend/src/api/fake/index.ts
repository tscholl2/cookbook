import { Recipe } from "../types";
import { IAPI } from "../";
declare const require: any;
const samples: Array<Recipe> = require("./samples.json");

const server = {
  data: {} as { [key: string]: Recipe },
};
for (let recipe of samples) {
  server.data[recipe.id] = clone(recipe);
}

export const API: IAPI = {
  downloadAllRecipes: async () => {
    await pause();
    return clone(server.data);
  },
  editRecipe: async (recipe: Recipe) => {
    await pause();
    recipe = clone(recipe);
    recipe.id = recipe.id || `${Math.random()}`;
    recipe.datePublished = new Date().toJSON();
    recipe.lastEdited = new Date().toJSON();
    server.data[recipe.id] = recipe;
    return clone(recipe);
  },
  newRecipe: async (recipe: Recipe) => API.editRecipe(recipe),
  status: async () => {
    await pause();
    return { uptime: "1 day 3 hr 9 min" };
  },
};

function pause(n = 1000) {
  return new Promise(resolve => setTimeout(resolve, n));
}

function clone<T>(a: T): T {
  return JSON.parse(JSON.stringify(a));
}
