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

export const onNotecardEditorDelete = (dispatch: Dispatch<State>) => (
  e: any
) => {
  e.preventDefault();
  e.stopPropagation();
  let parent = e.target;
  while (parent.tagName !== "LI" || !parent.getAttribute("name"))
    parent = parent.parentElement;
  const i = parseInt(parent.getAttribute("name"), 10);
  dispatch(state => ({
    ...state,
    recipes: state.recipes?.filter((_, j) => j != i),
    editor: { ...state.editor, i: undefined, error: undefined }
  }));
}

export const onNotecardEditorCancel = (dispatch: Dispatch<State>) => (
  e: any
) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(state => ({
    ...state,
    editor: { ...state.editor, i: undefined, error: undefined }
  }));
};

export const onNotecardEditorSubmit = (dispatch: Dispatch<State>) => (
  e: any,
  r: Recipe,
  error?: string
) => {
  e.preventDefault();
  e.stopPropagation();
  if (error) {
    dispatch(state => ({
      ...state,
      editor: { ...state.editor, value: r, error }
    }));
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
        .then(() =>
          dispatch(s => ({
            ...s,
            recipes,
            editor: {}
          }))
        )
        .catch((e: any) =>
          dispatch(s => ({
            ...s,
            editor: { ...s.editor, value: r },
            api: { ...s.api, error: `${e}` }
          }))
        )
        .finally(() =>
          dispatch(s => ({
            ...s,
            api: { ...s.api, status: undefined }
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
  let parent = e.target;
  while (parent.tagName !== "LI" || !parent.getAttribute("name"))
    parent = parent.parentElement;
  const i = parseInt(parent.getAttribute("name"), 10);
  dispatch(state => ({
    ...state,
    editor: { ...state.editor, i }
  }));
  document.getElementById("title-input")?.focus();
};
