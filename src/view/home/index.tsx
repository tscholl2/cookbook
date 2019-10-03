import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State, Recipe } from "../../model";
import {
  encodeRecipes,
  validate,
  encodeRecipe,
  parseRecipe
} from "../../utils/parse";
import { save } from "../../utils/api";

export function Home(dispatch: Dispatch<State>) {
  const validateAndSaveInput = (e: any) => {
    const i = parseInt(e.target.getAttribute("name"), 10);
    const s = e.target.value;
    const error = validate(s);
    if (error) {
      dispatch(state =>
        state.editing ? { ...state, editingError: error } : state
      );
      console.error(error);
      return;
    }
    dispatch(s2 => {
      if (s2.editing === undefined) {
        return s2;
      }
      const state = { ...s2 };
      state.editing = undefined;
      state.editingError = undefined;
      state.recipes = state.recipes!.slice(0); // copy array
      state.recipes![i] = parseRecipe(s);
      save(state.user!, encodeRecipes(state.recipes!));
      return state;
    });
  };
  const setFocus = (e: any) => {
    e.preventDefault();
    dispatch(state => ({ ...state, editing: e.target.getAttribute("name") }));
  };
  const onKeyDown = (e: any) => {
    if (e.keyCode === 9 || e.keyCode === 27) {
      e.preventDefault();
      dispatch(state => ({
        ...state,
        editing: undefined,
        editingError: undefined
      }));
    }
  };
  return function({ user, recipes, editing, editingError }: State) {
    return [
      <h2 key="title">Welcome {user}!</h2>,
      recipes && recipes.length > 0 ? (
        <ul key="list">
          {[
            {
              title: "TITLE",
              ingrediants: [],
              directions: ["Add recipe"]
            } as Recipe
          ]
            .concat(recipes)
            .map((r, i) =>
              editing != i ? (
                <li key={i} name={i} onclick={setFocus}>
                  {JSON.stringify(r)}
                </li>
              ) : (
                <li key={i}>
                  <textarea
                    key="input"
                    name={i === 0 ? recipes.length : i - 1}
                    value={encodeRecipe(r)}
                    onkeydown={onKeyDown}
                    onblur={validateAndSaveInput}
                    autofocus={true}
                  ></textarea>
                  {editingError ? (
                    <span key="err" style="color:red;">
                      {editingError}
                    </span>
                  ) : (
                    undefined
                  )}
                  <img
                    key="idk"
                    style="display:none;"
                    src="#"
                    onerror={(e: any) => {
                      // TODO this is just bad
                      e.target.previousSibling.focus();
                      e.target.previousSibling.scrollTop = 0;
                      e.target.previousSibling.selectionEnd = 0;
                    }}
                  ></img>
                </li>
              )
            )}
        </ul>
      ) : (
        <h3 key="empty">No recipes :(</h3>
      )
    ];
  };
}
