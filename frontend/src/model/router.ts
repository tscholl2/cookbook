import { logReducerCreator } from "src/controller/redux-devtools";
import { Route } from "src/utils/history";
import { shallowCompare } from "src/utils/shallow-compare";
import { set, freeze } from "icepick";
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
      if (s.path !== path) {
        s = set(s, "path", path);
      }
      if (s.title !== title) {
        s = set(s, "title", title);
      }
      if (!shallowCompare(s.data, data)) {
        s = set(s, "data", data);
      }
      if (s.path !== path || s.title !== title || !shallowCompare(s.data,data)){
        
      }
      return s;
    },
    "goTo",
  ),
};
