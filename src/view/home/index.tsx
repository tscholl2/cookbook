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
  const setFocus = actions.setFocus(dispatch);
  const onKeyDown = actions.onKeyDown(dispatch);
  const validateAndSaveInput = actions.validateAndSaveInput(dispatch);
  return function (state: State) {
    const { user, recipes = [], editing, editingError } = state;
    let filteredRecipes = actions.filteredRecipesSelector(state);
    return (
      <main class="home">
        <h2 key="title">Cookbook /{user}</h2>
        {searchForm(state)}
        <ul key="list">
          {editing === recipes.length ? (
            <li key={editing} name={editing}>
              <NotecardEditor
                recipe={{ title: "", ingrediants: [], directions: [] }}
                oncancel={() => dispatch(s => ({ ...s, editing: undefined }))}
                // TODO: onsubmit/change
              />
            </li>
          ) : (
            filteredRecipes.map(({ item: r, refIndex: i }) => {
              if (editing != i)
                return (
                  <li key={i} name={i} onclick={setFocus}>
                    <Notecard recipe={r} />
                  </li>
                );
              return (
                <li key={i}>
                  <textarea
                    key="input"
                    name={i === 0 ? recipes.length : i - 1}
                    value={JSON.stringify(r)}
                    onkeydown={onKeyDown}
                    onblur={validateAndSaveInput}
                    autofocus={true}
                  ></textarea>
                  {editingError ? (
                    <span key="err" style="color:red;">
                      {editingError}
                    </span>
                  ) : undefined}
                </li>
              );
            })
          )}
        </ul>
      </main>
    );
  };
}
