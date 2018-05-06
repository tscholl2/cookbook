import { Dispatch } from "src/controller";
import { logReducer } from "src/controller/redux-devtools";
import { Route, go } from "src/utils/history";
import { shallowCompare } from "src/utils/shallow-compare";
import { pathsMatcher } from "src/utils/path-matcher";
import { freeze } from "icepick";

export type State = Route;

export const initialState: State = freeze({
  path: "",
  data: {},
  title: "",
});

export function createActions(dispatch: Dispatch<State>) {
  return {
    goToHome: () => dispatch(goTo("/")),
    goToRecipe: (recipeID: string) => dispatch(goTo(`/recipe/${recipeID}`, { recipeID })),
    goToNew: () => dispatch(goTo("/new")),
    goToEdit: (recipeID: string) => dispatch(goTo(`/edit/${recipeID}`, { recipeID })),
    goToAll: () => dispatch(goTo("/view")),
    selectPageName: (state: State) => pages[pm(state.path)!.index].name,
  };
}

export function getStateFromPath(path: string) {
  const { params } = pm(path) || { params: {} };
  return params;
}

function goTo(path = "", data = {}, title = "") {
  return logReducer("goTo", { path, data, title }, (s: State) => {
    data = { ...data, ...getStateFromPath(path) };
    if (s.path !== path || s.title !== title || !shallowCompare(s.data, data)) {
      return go({ path, data, title });
    }
    return s;
  });
}

export const enum PageName {
  HOME = "HOME",
  ALL_RECIPES = "ALL_RECIPES",
  RECIPE = "RECIPE",
  EDIT_RECIPE = "EDIT_RECIPE",
  NEW_RECIPE = "NEW_RECIPE",
  NOT_FOUND = "NOT_FOUND",
}

const pages = [
  { path: "/recipe/:recipeID", name: PageName.RECIPE },
  { path: "/view", name: PageName.ALL_RECIPES },
  { path: "/new", name: PageName.NEW_RECIPE },
  { path: "/edit/:recipeID", name: PageName.EDIT_RECIPE },
  { path: "*", name: PageName.HOME },
  // TODO: add 404
];

const pm = pathsMatcher(pages.map(a => a.path));
