import { Controller, Reducer, Dispatch } from "../controller";
declare const window: any;

export function connectControllerToReduxDevtools(controller: Controller) {
  if (window["__REDUX_DEVTOOLS_EXTENSION__"]) {
    let devtools: any;
    if (window["devtools"] === undefined) {
      devtools = window["__REDUX_DEVTOOLS_EXTENSION__"].connect();
      window["devtools"] = devtools;
      devtools.send({ type: "APP_START" }, controller.getState());
    } else {
      devtools = window["devtools"];
      devtools.send({ type: "APP_RELOADED" }, controller.getState());
    }
    controller.addPlugin(r => state => {
      const next = r(state);
      let s: any = r;
      if (!s.__REDUX_DEVTOOLS_IGNORE__ && next !== state) {
        devtools.send({ type: s.__rdtname || "?", args: s.__rdtargs || [] }, next);
      }
      return next;
    });
    devtools.subscribe((message: any) => {
      if (message.type === "DISPATCH" && message.state) {
        controller.dispatch(
          Object.assign(() => JSON.parse(message.state), { __REDUX_DEVTOOLS_IGNORE__: true }),
        );
      }
    });
  }
}

// TODO: unused?
export function logReducerCreator<T extends Function>(name: string, reducerCreator: T): T {
  return ((...args: any[]) => logReducer(name, args, reducerCreator(...args))) as any;
}

// TODO: unused?
export function logDispatch<S>(name: string, dispatch: Dispatch<S>): Dispatch<S> {
  return (r: Reducer<S>) => dispatch(logReducer(name, [], r));
}

export function logReducer<S>(name: string, args: any, r: Reducer<S>): Reducer<S> {
  return Object.assign(r, { __rdtname: name, __rdtargs: args });
}
