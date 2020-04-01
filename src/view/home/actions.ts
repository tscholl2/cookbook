import Fuse from "fuse.js";
import { createSelector } from "reselect";
import { State, Recipe } from "../../model";
import { Dispatch } from "../../controller";
import { save } from "../../utils/api";

const fuseSelector = createSelector(
  (state: State) => state.recipes || [],
  recipes =>
    new Fuse(recipes, {
      shouldSort: true,
      tokenize: false,
      threshold: 0.5,
      location: 0,
      distance: 50,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["title", "ingrediants", "directions"]
    })
);

export const filteredRecipesSelector = createSelector(
  fuseSelector,
  (state: State) => state.recipes || [],
  (state: State) => state.search.value,
  (fuse, recipes, value) => {
    let filteredRecipes: Array<{
      refIndex: number;
      item: Recipe;
    }> = recipes.map((r, i) => ({ item: r, refIndex: i }));
    if (value) {
      filteredRecipes = fuse.search(value).slice(0, 5) as any;
    }
    return filteredRecipes;
  }
);

export const validateAndSaveInput = (dispatch: Dispatch<State>) => (e: any) => {
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

export const setFocus = (dispatch: Dispatch<State>) => (e: any) => {
  e.preventDefault();
  dispatch(state => ({
    ...state,
    editing: e.target.getAttribute("name"),
    editingError: undefined
  }));
};

export const onKeyDown = (dispatch: Dispatch<State>) => (e: any) => {
  if (e.keyCode === 9 || e.keyCode === 27) {
    e.preventDefault();
    dispatch(state => ({
      ...state,
      editing: undefined,
      editingError: undefined
    }));
  }
};
