import { State as routerState, initialState as routerInitialState } from "./router";
import { State as formsState, initialState as formsInitialState } from "./forms";
import { State as apiState, initialState as apiInitialState } from "./api";
import { State as uiState, initialState as uiInitialState } from "./ui";
export { actionsCreator } from "./actions";

export interface State {
  route: routerState;
  forms: formsState;
  api: apiState;
  ui: uiState;
}

export const initialState: Readonly<State> = {
  route: routerInitialState,
  forms: formsInitialState,
  api: apiInitialState,
  ui: uiInitialState,
};
