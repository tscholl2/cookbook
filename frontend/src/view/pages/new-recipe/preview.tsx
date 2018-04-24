import { h } from "src/view/h";
import { parseIngrediant } from "src/utils/parse-ingrediant";
import { RecipeInput } from "./types";
import { Recipe } from "src/model/api";

export function Preview(input: RecipeInput) {
  let preview: JSX.Element;
  try {
    preview = <p>{JSON.stringify(inputToRecipe(input))}</p>;
  } catch (e) {
    preview = <p style={{ color: "red" }}>{`${e}`}</p>;
  }
  return (
    <div>
      <h2>Preview</h2>
      {preview}
    </div>
  );
}

function inputToRecipe(input: RecipeInput): Recipe {
  const { name, author, servings = 1, directions, ingrediants: rawIngrediants } = input;
  return {
    name,
    author,
    servings,
    totalTime: "0",
    images: [],
    directions,
    id: "new",
    ingredients: rawIngrediants.split("\n").map(parseIngrediant),
    lastEdited: new Date().toJSON(),
    datePublished: new Date().toJSON(),
  };
}
