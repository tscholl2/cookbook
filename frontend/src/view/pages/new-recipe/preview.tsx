import { h } from "src/view/h";
import { RecipeInput } from "./types";
import { inputToRecipe } from "./types";

export function Preview(input: RecipeInput) {
  let preview: JSX.Element;
  try {
    preview = <pre>{JSON.stringify(inputToRecipe(input),null,"  ")}</pre>;
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
