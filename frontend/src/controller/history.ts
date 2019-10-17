import { Controller, Reducer } from "src/controller";
import { Route, getCurrentRoute, go } from "src/utils/history";
import { logReducer } from "./redux-devtools";

const listeners = new Map<Controller<any>, (r: Route) => void>();

export function connectControllerToHistory<S>(
  c: Controller<S>,
  reducerCreator: (route: Route) => Reducer<S>,
) {
  listeners.set(c, route =>
    c.dispatch(logReducer("native navigation", route, reducerCreator(go(route)))),
  );
  // TODO: initialize route here and do not use "data" attribute in history,
  // instead storing everything in the url itself and running some extract
  // function in selector.
  // listeners.get(c)!(getCurrentRoute());
}

export function disconnectControllerFromHistory<S>(c: Controller<S>) {
  listeners.delete(c);
}

addEventListener("popstate", () => listeners.forEach(l => l(getCurrentRoute())));