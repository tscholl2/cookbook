import { Dispatch } from "src/controller";
import { setIn } from "icepick";
import { logReducer } from "src/controller/redux-devtools";

export type State = { [key: string]: any };
export const initialState: State = {};

export function createActions(dispatch: Dispatch<State>) {
  return {
    setIn: (path: string[], value: any) =>
      dispatch(logReducer("ui-set", { path, value }, state => setIn(state, path, value))),
  };
}
