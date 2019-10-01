import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State } from "../../model";
import { encodeRecipes, validate, parseRecipe } from "../../utils/parse";
import { save } from "../../utils/api";

export function Home(dispatch: Dispatch<State>) {
  const validateAndSaveInput = (e: any) => {
    console.log(e.target);
    const i = parseInt(e.target.getAttribute("name"), 10);
    const s = e.target.value;
    const error = validate(s);
    if (error) {
      dispatch(state => ({ ...state, editingError: error }));
      console.error(error);
      return;
    }
    dispatch(s2 => {
      const state = { ...s2 };
      state.editing = undefined;
      state.editingError = undefined;
      state.recipes = ([] as string[]).concat(state.recipes!); // copy array
      console.log("ABOUT TO UPDATE", JSON.stringify(state.recipes), i, s);
      state.recipes![i] = s;
      save(state.user!, encodeRecipes(state.recipes!.map(parseRecipe)));
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
      validateAndSaveInput(e);
    }
  };
  return function({ user, recipes, editing }: State) {
    return [
      <h2 key="title">Welcome {user}!</h2>,
      recipes && recipes.length > 0 ? (
        <ul key="list">
          {["# title\n\n\n\nadd new recipe"].concat(recipes).map((r, i) =>
            editing != i ? (
              <li key={i} name={i} onclick={setFocus}>
                {JSON.stringify(parseRecipe(r))}
              </li>
            ) : (
              <li key={i}>
                <textarea
                  name={i === 0 ? recipes.length : i}
                  value={r}
                  onkeydown={onKeyDown}
                  onblur={validateAndSaveInput}
                ></textarea>
                <img
                  style="display:none;"
                  src="#"
                  onerror={(e: any) => {
                    // TODO this is just bad
                    e.target.previousSibling.focus();
                    e.target.previousSibling.scrollTop = 0;
                    e.target.previousSibling.selectionEnd = 0;
                  }}
                ></img>
                <button>save</button>
              </li>
            )
          )}
        </ul>
      ) : (
        <h3 key="empty">No recipes :(</h3>
      ),
      <button key="new" onclick={() => dispatch(state => ({ ...state }))}>
        Add
      </button>
    ];
  };
}
