import { Recipe } from "../model";
import { parseRecipes, encodeRecipes } from "./parse";

export async function load(_: string): Promise<Recipe[]> {
  return parseRecipes(SERVER);
}

export async function save(_: string, data: Recipe[]) {
  SERVER = encodeRecipes(data);
  return;
}

let SERVER = `

# grilled cheese

bread
cheese
butter

butter the bread
add cheese
grill

# soup

veggies
water
spices

chop veggies
put in water
heat for a while

`;
