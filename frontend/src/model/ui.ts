import { Dispatch } from "src/controller";
import { setIn } from "icepick";

export type State = { [key: string]: any };
export const initialState: State = {};

export function actions(dispatch: Dispatch<State>) {
  return {
    setIn: (path: string[], value: any) => dispatch(state => setIn(state, path, value)),
  };
}

/*
export function selectors() {
  return {
    getIn: (state: State, path: string[]) => getIn(state, path),
  };
}
*/
