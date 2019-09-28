import * as test from "tape";
import { parseRecipes, encodeRecipes } from "./parse";

let SAMPLE1 = `# grilled cheese

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

let SAMPLE2 = [
  {
    title: "grilled cheese",
    ingrediants: ["bread", "cheese", "butter"],
    directions: ["butter the bread", "add cheese", "grill"]
  },
  {
    title: "soup",
    ingrediants: ["veggies", "water", "spices"],
    directions: ["chop veggies", "put in water", "heat for a while"]
  }
];

test("test parse/encode recipes", t => {
  t.deepEqual(parseRecipes(SAMPLE1), SAMPLE2);
  t.deepEqual(encodeRecipes(SAMPLE2), SAMPLE1);
  t.end();
});
