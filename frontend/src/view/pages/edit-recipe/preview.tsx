import * as View from "../../h";
import { RecipeFormValues, formValuesToRecipe } from "../../../utils/recipe-form-values";
import { memoize } from "../../../utils/memoize";
import { IngredientAmount } from "../../components/ingredient-amount";

export const Preview = memoize(function Preview(input: RecipeFormValues) {
  let preview: JSX.Element | JSX.Element[];
  try {
    const recipe = formValuesToRecipe(input);
    preview = [
      <h3>{recipe.name}</h3>,
      <ul>
        <li>Servings = {recipe.servings}</li>
        <li>Time = {recipe.totalTime}</li>
        <li>Author = {recipe.author}</li>
        <li>Tags = {recipe.tags.map(t => <span class="chip">{t}</span>)}</li>
      </ul>,
      <h4>Ingrediants</h4>,
      <table class="text-center">
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
              <td>
                <IngredientAmount amount={i.amount} />
              </td>
              <td>{i.measurement}</td>
              <td>{i.name}</td>
            </tr>
          ))}
        </tbody>
      </table>,
      <h4>Directions</h4>,
      <ol>{recipe.directions.map(l => <li>{l}</li>)}</ol>,
    ];
  } catch (e) {
    console.error(e);
    preview = <p style="color:red;">{`${e}`}</p>;
  }
  return preview;
});
