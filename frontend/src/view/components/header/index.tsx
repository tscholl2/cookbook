import { h } from "src/view/h";
import { Dispatch } from "src/controller";
import { State, actionsCreator } from "src/model";
import "./style.scss";

export const connectHeader = (dispatch: Dispatch<State>) => {
  const actions = actionsCreator(dispatch);
  const Header = () => {
    return (
      <header class="cookbook-header">
        <h1 onclick={actions.router.goToHome}>Cookbook</h1>
        <nav>
          <button class="btn btn-sm" onclick={actions.router.goToHome}>
            Home
          </button>
          <button class="btn btn-sm" onclick={actions.router.goToAll}>
            View Recipes
          </button>
          <button class="btn btn-sm" onclick={actions.router.goToNew}>
            Add Recipe
          </button>
        </nav>
      </header>
    );
  };
  return Header;
};
