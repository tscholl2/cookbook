import { Reducer, Dispatch } from "src/controller";
import { set } from "icepick";
import { actions as routeActions } from "src/model/router";
import { actions as apiActions } from "src/model/api";
import { actions as uiActions } from "src/model/ui";
import { State } from "src/model";

export function actionsCreator(dispatch: Dispatch<State>) {
  return {
    router: routeActions(dispatchSlicer("route")(dispatch)),
    api: apiActions(dispatchSlicer("api")(dispatch)),
    uiActions: uiActions(dispatchSlicer("ui")(dispatch))
  };
}

function dispatchSlicer<K extends keyof State>(
  k: K
): (dispatch: Dispatch<State>) => Dispatch<State[K]> {
  const f = reducerSlicer(k);
  return d => r => d(f(r));
}

function reducerSlicer<K extends keyof State>(k: K): (r: Reducer<State[K]>) => Reducer<State> {
  // We use Object.assign to carry any debug/devtool info on r to the monkey-patched function.
  return r => Object.assign((state: any) => set(state, k, r(state[k])), r as any);
}
