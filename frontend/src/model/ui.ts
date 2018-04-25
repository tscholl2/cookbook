import { Dispatch } from "src/controller";
import { setIn, getIn } from "icepick";

export type State = { [key: string]: any };
export const initialState: State = {};

export function createActions(dispatch: Dispatch<State>) {
  return {
    setIn: (path: string[], value: any) => dispatch(state => setIn(state, path, value)),
    selectIn: (state: State, path: string[]) => getIn(state, path),
  };
}
