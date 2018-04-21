import { State as routerState, initialState as routerInitialState } from "src/model/router";
import { State as formsState, initialState as formsInitialState } from "src/model/forms";
import { State as apiState, initialState as apiInitialState } from "src/model/api";

export interface State {
  count: number;
  route: routerState;
  forms: formsState;
  api: apiState;
}

export const initialState: Readonly<State> = {
  count: 0,
  route: routerInitialState,
  forms: formsInitialState,
  api: apiInitialState,
};
