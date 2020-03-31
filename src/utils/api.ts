import { Recipe } from "src/model";

export async function load(_: string): Promise<Array<Recipe>> {
  return SERVER;
}

export async function save(_: string, data: Array<Recipe>) {
  SERVER = data;
  return;
}

let SERVER = [
  {
    title: "grilled cheese",
    ingrediants: ["bread", "cheese", "butter"],
    directions: ["butter the bread", "add cheese", "grill"]
  },
  {
    title: "soup",
    ingrediants: ["veggies", "water", "spices"],
    directions: ["chop veggies", "put in water", "heat for a while"]
  },
  {
    title: "sandwich",
    ingrediants: ["veggies", "bread", "mayo"],
    directions: ["put stuff on bread", "add veggies and stuff", "toast maybe"]
  }
];
