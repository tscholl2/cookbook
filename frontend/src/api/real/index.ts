import { Recipe } from "../types";
import { IAPI } from "../";

const base = `${location.protocol}//${location.host}/api`;

const options: RequestInit = {
  credentials: "include",
  cache: "no-cache",
  headers: { "content-type": "application/json" },
  mode: "same-origin",
};

export const API: IAPI = {
  downloadAllRecipes: async () => {
    const resp = await fetch(base + "/all", options);
    return await resp.json();
  },
  editRecipe: async (recipe: Recipe) => {
    const resp = await fetch(base + "/edit", {
      method: "POST",
      body: JSON.stringify(recipe),
      ...options,
    });
    return await resp.json();
  },
  newRecipe: async (recipe: Recipe) => {
    const resp = await fetch(base + "/new", {
      method: "POST",
      body: JSON.stringify(recipe),
      ...options,
    });
    return await resp.json();
  },
  status: async () => {
    const resp = await fetch(base + "/status", options);
    return await resp.json();
  },
};
