import { State as routerState, initialState as routerInitialState } from "./router";
import { State as formsState, initialState as formsInitialState } from "./forms";
import { State as apiState, initialState as apiInitialState } from "./api";
import { actions as A } from "./actions";

export const actions = A;

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
