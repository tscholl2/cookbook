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

export const onNotecardEditorCancel = (dispatch: Dispatch<State>) => (
  e: any
) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(state => ({
    ...state,
    editing: undefined,
    editingError: undefined
  }));
};

export const onNotecardEditorSubmit = (dispatch: Dispatch<State>) => (
  e: any,
  r: Recipe,
  err?: string
) => {
  e.preventDefault();
  e.stopPropagation();
  if (err) {
    dispatch(state => ({ ...state, editingError: err }));
    return;
  }
  let parent = e.target;
  while (parent.tagName !== "LI" || !parent.getAttribute("name"))
    parent = parent.parentElement;
  const i = parseInt(parent.getAttribute("name"), 10);
  dispatch(state => {
    const recipes = state.recipes!.slice(0);
    if (i > -1) {
      recipes[i] = r;
    } else {
      recipes.unshift(r);
    }
    if (state.user && recipes && recipes.length > 0)
      save(state.user, recipes)
        .then(() => dispatch(s => ({ ...s, recipes })))
        .catch((e: any) => dispatch(s => ({ ...s, api: { ...s.api, error: `${e}` } })))
        .finally(() =>
          dispatch(s => ({
            ...s,
            api: { ...s.api, status: undefined },
            editingError: undefined,
            editing: undefined
          }))
        );
    return {
      ...state,
      api: { ...state.api, status: "saving" }
    };
  });
};

export const onNotecardClick = (dispatch: Dispatch<State>) => (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  console.log(e.target);
  let parent = e.target;
  while (parent.tagName !== "LI" || !parent.getAttribute("name"))
    parent = parent.parentElement;
  const i = parseInt(parent.getAttribute("name"), 10);
  dispatch(state => ({
    ...state,
    editing: i
  }));
  document.getElementById("title-input")?.focus();
};
