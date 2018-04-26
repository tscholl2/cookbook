import { h } from "src/view/h";
import { RecipeInput } from "./types";
import { inputToRecipe } from "./types";
import { Markdown } from "src/view/components/markdown";

// TODO: memoize
export function Preview(input: RecipeInput) {
  let preview: JSX.Element;
  try {
    const recipe = inputToRecipe(input);
    // TODO: markdown is unnecessary here
    preview = (
      <Markdown>{`
# ${recipe.name}

* Servings = ${recipe.servings}
* Time = ${recipe.totalTime}
* Author = ${recipe.author}

# Ingrediants

| Amount | Measurement | Name |
| :----: | :---------: | :--: |
${recipe.ingredients.map(i => `| ${i.amount} | ${i.measurement} | ${i.name} |`).join("\n")}

# Directions

${recipe.directions.map((l, i) => `${i + 1}. ${l}`).join("\n")}

`}</Markdown>
    );
  } catch (e) {
    preview = <p style={{ color: "red" }}>{`${e}`}</p>;
  }
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Preview</h2>
      {preview}
    </div>
  );
}
