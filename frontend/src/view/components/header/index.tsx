import { h } from "src/view/h";
import { Dispatch } from "src/controller";
import { State, actionsCreator } from "src/model";
import { createSelector } from "reselect";
import "./style.scss";

export const ConnectHeader = (dispatch: Dispatch<State>) => {
  const actions = actionsCreator(dispatch);
  return createSelector(
    (state: State) => state.api.data.recipes[state.route.data.recipeID],
    recipe => {
      return (
        <header class="cookbook-header">
          <h1 class="h1" onclick={actions.router.goToHome}>
            Cookbook
          </h1>
          <nav>
            <ul>
              <li>
                <a onclick={actions.router.goToHome}>home</a>
              </li>
              <li>
                <a onclick={actions.router.goToNew}>new</a>
              </li>
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
