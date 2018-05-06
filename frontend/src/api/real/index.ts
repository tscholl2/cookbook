import { Recipe } from "../types";
import { IAPI } from "../";

const base = `${location.protocol}//${location.host}/api`;

export const API: IAPI = {
  downloadAllRecipes: async () => {
    const resp = await fetch(base + "/all");
    return await resp.json();
  },
  editRecipe: async (_: Recipe) => {
    throw new Error("TODO");
  },
  newRecipe: async (_: Recipe) => {
    throw new Error("TODO");
  },
  status: async () => {
    const resp = await fetch(base + "/status");
    return await resp.json();
  },
};
