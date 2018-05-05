import { h } from "src/view/h";
import { Dispatch } from "src/controller";
import { State, actionsCreator } from "src/model";
import "./style.scss";

export const ConnectHeader = (dispatch: Dispatch<State>) => {
  const actions = actionsCreator(dispatch);
  const Header = () => {
    return (
      <header class="cookbook-header">
        <h1 onclick={actions.router.goToHome}>
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
  };
  return Header;
};
