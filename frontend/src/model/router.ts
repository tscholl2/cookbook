import { logReducerCreator } from "src/controller/redux-devtools";
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

export const actions = {
  goToRecipe: (dispatch: Dispatch<State>) => (recipeID: string) =>
    dispatch(goTo(`/recipe/${recipeID}`, { recipeID })),
  goToNew: (dispatch: Dispatch<State>) => () => dispatch(goTo("/new")),
  goToAll: (dispatch: Dispatch<State>) => () => dispatch(goTo("/view")),
};

function goTo(path = "", data = {}, title = "") {
  return logReducerCreator((s: State) => {
    if (s.path !== path || s.title !== title || !shallowCompare(s.data, data)) {
      return go({ path, data, title });
    }
    return s;
  }, "goTo");
}
