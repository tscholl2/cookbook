import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { createSelector } from "reselect";

export const ViewRecipePage = (_: Dispatch<State>) => {
  return createSelector(
    (state: State, params: { [key: string]: string }) => state.api.data.recipes[params.recipeID],
    recipe => {
      return (
        <div>
          <h1>Recipe</h1>
          <div>{JSON.stringify(recipe)}</div>
        </div>
      );
    },
  );
};
