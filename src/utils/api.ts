import { Recipe } from "src/model";
import * as real from "./api_real";

declare const process: any;

export const load: (user: string) => Promise<Array<Recipe>> =
  process.env.NODE_ENV === "production" ? real.load : async () => SERVER;

export const save: (user: string, data: Array<Recipe>) => Promise<void> =
  process.env.NODE_ENV === "production"
    ? real.save
    : async (_, data) => (SERVER = data) && undefined;

let SERVER: Array<Recipe> = [];[
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
  },
  {
    title: "Pancakes",
    ingrediants: [
      "1 pancake",
      "1/4 cup flour",
      "1/2 cup sugar",
      "100 eggs",
      "11 liters",
      "1 pan",
      "1 stove",
      "2 eagles",
      "1 egg",
      "salt"
    ],
    directions: [
      "Put pancake in pan",
      "do something else",
      "listen to music",
      "mix something",
      "idk",
      "this is just a test",
      "another test",
      "do something else",
      "listen to music",
      "mix something"
    ]
  }
];
