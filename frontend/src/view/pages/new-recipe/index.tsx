import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { createFormSelector } from "src/model/forms";
import { Ingredient } from "src/model/api";

interface RecipeForm {
  name: string;
  description: string;
  totalTime: string;
  directions: string;
  ingredients: Array<Ingredient>;
  servings: number;
  images: Array<string>;
  author: string;
}

export const NewRecipePage = (dispatch: Dispatch<State>) => {
  const formSelector = createFormSelector<RecipeForm>("new-recipe", {})(dispatch);
  return (state: State) => {
    const { handleSubmit, values, handleChange } = formSelector(state);
    return (
      <div>
        <h1>TODO</h1>
        <form onsubmit={handleSubmit}>
          <input type="text" name="name" value={values.name || ""} onchange={handleChange} />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  };
};
