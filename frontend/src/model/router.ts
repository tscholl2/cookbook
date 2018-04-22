import { logReducer } from "src/controller/redux-devtools";
import { Route, go } from "src/utils/history";
import { shallowCompare } from "src/utils/shallow-compare";
import { freeze } from "icepick";
import { Dispatch } from "src/controller";

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
