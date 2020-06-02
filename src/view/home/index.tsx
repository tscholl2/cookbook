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
    const { user, editor } = state;
    let filteredRecipes = actions.filteredRecipesSelector(state);
    return (
      <main class="home">
        <h1 key="title">Recipes /{user}</h1>
        {searchForm(state)}
        <ul key="list">
          {editor.i === -1 ? (
            <li key={"editor"} name={-1}>
              <NotecardEditor
                recipe={
                  editor.value || {
                    title: "",
                    ingrediants: [],
                    directions: []
                  }
                }
                onCancel={onNotecardEditorCancel}
                onSubmit={onNotecardEditorSubmit}
                error={editor.error}
              />
            </li>
          ) : null}
          {filteredRecipes.map(({ item: r, refIndex: i }) => (
            <li
              key={i}
              name={i}
              onclick={editor.i === i ? undefined : onNotecardClick}
              onkeydown={
                editor.i === i
                  ? undefined
                  : (e: any) => e.keyCode === 13 && onNotecardClick(e)
              }
            >
              {editor.i === i ? (
                <NotecardEditor
                  recipe={editor.value || r}
                  onCancel={onNotecardEditorCancel}
                  onSubmit={onNotecardEditorSubmit}
                  error={editor.error}
                />
              ) : (
                <Notecard recipe={r} containerProps={divprops} />
              )}
            </li>
          ))}
        </ul>
      </main>
    );
  };
}

const divprops = {tabindex:"0"};
