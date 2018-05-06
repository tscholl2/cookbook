import { Recipe } from "../types";
import { IAPI } from "../";

const base = `${location.protocol}//${location.host}/api`;

export const API: IAPI = {
  downloadAllRecipes: async () => {
    const resp = await fetch(base + "/all");
    return await resp.json();
  },
  editRecipe: async (recipe: Recipe) => {
    const resp = await fetch(base + "/edit", { method: "POST", body: JSON.stringify(recipe) });
    return await resp.json();
  },
  newRecipe: async (recipe: Recipe) => {
    const resp = await fetch(base + "/new", { method: "POST", body: JSON.stringify(recipe) });
    return await resp.json();
  },
  status: async () => {
    const resp = await fetch(base + "/status");
    return await resp.json();
  },
};
