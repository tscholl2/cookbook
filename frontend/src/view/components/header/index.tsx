import { h } from "src/view/h";
import { Dispatch } from "src/controller";
import { State, actionsCreator } from "src/model";
import { createSelector } from "reselect";

export const ConnectHeader = (dispatch: Dispatch<State>) => {
  const actions = actionsCreator(dispatch);
  return createSelector(
    (state: State) => state.api.data.recipes[state.route.data.recipeID],
    recipe => {
      return (
        <header>
          {recipe && <h1>{recipe.name}</h1>}
          <nav>
            <ul>
              <li>
                <a onclick={actions.router.goToAll}>All Recipes</a>
              </li>
            </ul>
          </nav>
        </header>
      );
    },
  );
};
