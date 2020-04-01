import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State } from "../../model";
import { Search } from "./search";
import * as actions from "./actions";
import { Notecard } from "../notecard/notecard";
import "./style.scss";
import { NotecardEditor } from "../notecard/notecard-editor";

export function Home(dispatch: Dispatch<State>) {
  const searchForm = Search(dispatch);
  const onNotecardClick = actions.onNotecardClick(dispatch);
  const onCancel = () =>
    dispatch(s => ({ ...s, editing: undefined, editingError: undefined }));
  return function (state: State) {
    const { user, recipes = [], editing, editingError } = state;
    let filteredRecipes = actions.filteredRecipesSelector(state);
    return (
      <main class="home">
        <h2 key="title">Cookbook /{user}</h2>
        {searchForm(state)}
        <ul key="list">
          {editing === recipes.length ? (
            <li key={"editor"} name={editing}>
              <NotecardEditor
                recipe={
                  recipes[editing] || {
                    title: "",
                    ingrediants: [],
                    directions: []
                  }
                }
                oncancel={onCancel}
                // TODO: onsubmit/change
                error={editingError}
              />
            </li>
          ) : null}
          {filteredRecipes.map(({ item: r, refIndex: i }) => (
            <li key={i} name={i}>
              {editing === i ? (
                <NotecardEditor
                  key={"editor"}
                  recipe={r}
                  oncancel={onCancel}
                  // TODO: onsubmit/change
                  error={editingError}
                />
              ) : (
                <Notecard recipe={r} onclick={onNotecardClick} />
              )}
            </li>
          ))}
        </ul>
      </main>
    );
  };
}
