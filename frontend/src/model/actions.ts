import { Dispatch } from "src/controller";
import { set } from "icepick";
import { createActions as formsActions } from "./forms";
import { createActions as routeActions } from "./router";
import { createActions as apiActions } from "./api";
import { createActions as uiActions } from "./ui";
import { State } from "./";

export function actionsCreator(dispatch: Dispatch<State>) {
  const actions = {
    forms: formsActions(dispatchSlicer("forms")(dispatch)),
    router: routeActions(dispatchSlicer("route")(dispatch)),
    api: apiActions(dispatchSlicer("api")(dispatch)),
    ui: uiActions(dispatchSlicer("ui")(dispatch)),
  };
  return actions;
}

function dispatchSlicer<K extends keyof State>(k: K): (d: Dispatch<State>) => Dispatch<State[K]> {
  return d => r => {
    const s = d(Object.assign((state: any) => set(state, k, r(state[k])), r as any));
    return s[k];
  };
}
