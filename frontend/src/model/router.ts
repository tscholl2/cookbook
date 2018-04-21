import { logReducerCreator } from "src/controller/redux-devtools";
import { Route, go } from "src/utils/history";
import { shallowCompare } from "src/utils/shallow-compare";
import { freeze } from "icepick";
import { Reducer } from "src/controller";

export type State = Route;

export const initialState: State = freeze({
  path: "",
  data: {},
  title: "",
});

export const actions = {
  goTo: logReducerCreator(
    (path = "", data: any = {}, title = ""): Reducer<State> => s => {
      if (s.path !== path || s.title !== title || !shallowCompare(s.data, data)) {
        return go({ path, data, title });
      }
      return s;
    },
    "goTo",
  ),
};
