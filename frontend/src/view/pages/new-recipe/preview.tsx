import { h } from "src/view/h";
import { RecipeFormValues, formValuesToRecipe } from "src/utils/recipe-form-values";
// import { Markdown } from "src/view/components/markdown";

// TODO: memoize
export function Preview(input: RecipeFormValues) {
  let preview: JSX.Element;
  try {
    const recipe = formValuesToRecipe(input);
    preview = (
      <div>
        <h3>{recipe.name}</h3>
        <ul>
          <li>Servings = {recipe.servings}</li>
          <li>Time = {recipe.totalTime}</li>
          <li>Author = {recipe.author}</li>
          <li>Tags = {recipe.tags.map(t => <span class="label cookbook-tag">{t}</span>)}</li>
        </ul>
        <h4>Ingrediants</h4>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Measurement</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {recipe.ingredients.map(i => (
              <tr>
                <td>{i.amount}</td>
                <td>{i.measurement}</td>
                <td>{i.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>Directions</h4>
        <ol>{recipe.directions.map(l => <li>{l}</li>)}</ol>
      </div>
    );
  } catch (e) {
    console.error(e);
    preview = <p style={{ color: "red" }}>{`${e}`}</p>;
  }
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Preview</h2>
      {preview}
    </div>
  );
}
