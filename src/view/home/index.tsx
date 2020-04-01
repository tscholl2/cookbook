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
  const onNotecardEditorSubmit = actions.onNotecardEditorSubmit(dispatch);
  const onNotecardEditorCancel = actions.onNotecardEditorCancel(dispatch);
  return function (state: State) {
    const { user, recipes = [], editing, editingError } = state;
    let filteredRecipes = actions.filteredRecipesSelector(state);
    return (
      <main class="home">
        <h2 key="title">Cookbook /{user}</h2>
        {searchForm(state)}
        <ul key="list">
          {editing === -1 ? (
            <li key={"editor"} name={-1}>
              <NotecardEditor
                recipe={
                  recipes[editing] || {
                    title: "",
                    ingrediants: [],
                    directions: []
                  }
                }
                onCancel={onNotecardEditorCancel}
                onSubmit={onNotecardEditorSubmit}
                error={editingError}
              />
            </li>
          ) : null}
          {filteredRecipes.map(({ item: r, refIndex: i }) => (
            <li
              key={i}
              name={i}
              onclick={editing === i ? undefined : onNotecardClick}
              onkeydown={
                editing === i
                  ? undefined
                  : (e: any) => e.keyCode === 13 && onNotecardClick(e)
              }
            >
              {editing === i ? (
                <NotecardEditor
                  recipe={r}
                  onCancel={onNotecardEditorCancel}
                  onSubmit={onNotecardEditorSubmit}
                  error={editingError}
                />
              ) : (
                <Notecard recipe={r} tabindex="0" />
              )}
            </li>
          ))}
        </ul>
      </main>
    );
  };
}
