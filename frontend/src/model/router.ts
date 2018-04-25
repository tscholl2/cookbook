import { logReducer } from "src/controller/redux-devtools";
import { Route, go } from "src/utils/history";
import { shallowCompare } from "src/utils/shallow-compare";
import { freeze } from "icepick";
import { Dispatch } from "src/controller";
import { pathsMatcher } from "src/utils/path-matcher";

export type State = Route;

export const initialState: State = freeze({
  path: "",
  data: {},
  title: "",
});

export function actions(dispatch: Dispatch<State>) {
  return {
    goToRecipe: (recipeID: string) => dispatch(goTo(`/recipe/${recipeID}`, { recipeID })),
    goToNew: () => dispatch(goTo("/new")),
    goToAll: () => dispatch(goTo("/view")),
  };
}

function goTo(path = "", data = {}, title = "") {
  return logReducer("goTo", { path, data, title }, (s: State) => {
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
}

const pages = [
  { path: "/recipe/:recipeID", name: PageName.RECIPE },
  { path: "/view", name: PageName.ALL_RECIPES },
  { path: "/new", name: PageName.EDIT_RECIPE },
  { path: "*", name: PageName.HOME },
];

const pm = pathsMatcher(pages.map(a => a.path));

export function createSelectors(state: State) {
  return {
    selectPageName: () => pages[pm(state.path)!.index].name,
  };
}
