import { h } from "src/view/h";
import { State, actions } from "src/model";
import { Dispatch } from "src/controller";
import { createSelector } from "reselect";

export const AllRecipesPage = (dispatch: Dispatch<State>) => {
  const goToRecipe = actions.router.goToRecipe(dispatch);
  return createSelector(
    (state: State) => Object.keys(state.api.data.recipes).map(id => state.api.data.recipes[id]),
    recipes => {
      return (
        <div>
          {recipes.map(r => (
            <li key={r.id} onclick={() => goToRecipe(r.id)}>
              {JSON.stringify(r)}
            </li>
          ))}
        </div>
      );
    },
  );
};
