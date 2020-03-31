import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State, Recipe } from "../../model";
import { save } from "../../utils/api";
import Fuse from "fuse.js";
import { Search } from "./search";
import {createSelector} from 'reselect';

const fuseSelector = createSelector(
  (state: State) => state.recipes || [],
  (state: State) => state.search.field,
  (recipes,field) => new Fuse(recipes, {
    shouldSort: true,
    tokenize: false,
    threshold: 0.5,
    location: 0,
    distance: 50,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys:
      field === "title"
        ? ["title"]
        : field === "ingrediants"
        ? ["ingrediants"]
        : ["title", "ingrediants", "directions"]
  })
)

export function Home(dispatch: Dispatch<State>) {
  const validateAndSaveInput = (e: any) => {
    const i = parseInt(e.target.getAttribute("name"), 10);
    const s = e.target.value;
    let r: Recipe | undefined = undefined;
    try {
      r = JSON.parse(s);
    } catch (e) {
      const error = `${e}`;
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
      if (r) {
        state.recipes![i] = r;
      } else {
        state.recipes = state.recipes!.filter((_, j) => i != j);
      }
      setTimeout(() => save(state.user!, state.recipes!), 1);
      return state;
    });
  };
  const setFocus = (e: any) => {
    e.preventDefault();
    dispatch(state => ({
      ...state,
      editing: e.target.getAttribute("name"),
      editingError: undefined
    }));
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
  const searchForm = Search(dispatch);
  return function (state: State) {
    const { user, recipes = [], editing, editingError, search } = state;
    let filteredRecipes: Recipe[] = recipes;
    if (search.value) {
      const fuse = fuseSelector(state);
      filteredRecipes = fuse.search(search.value).slice(0, 5).map((x: any) => x.item);
    }
    return [
      <h2 key="title">Welcome {user}!</h2>,
      searchForm(state),
      <ul key="list">
        {[
          {
            title: "TITLE",
            ingrediants: [],
            directions: ["Add recipe"]
          } as Recipe
        ]
          // TODO: this is slow
          .concat(recipes.filter(r => filteredRecipes.includes(r)))
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
    ];
  };
}
