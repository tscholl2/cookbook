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
        devtools.send(
          { type: s.__redux_devtools_name || "?", args: s.__redux_devtools_args || [] },
          next,
        );
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

export function logReducerCreator<T extends Function>(reducerCreator: T, name: string): T {
  return ((...args: any[]) => logReducer(reducerCreator(...args), name, args)) as any;
}

export function logDispatch<S>(dispatch: Dispatch<S>, name: string): Dispatch<S> {
  return (r: Reducer<S>) => dispatch(logReducer(r, name, []));
}

function logReducer<S>(r: Reducer<S>, name: string, args: any): Reducer<S> {
  return Object.assign(r, {
    __redux_devtools_name: name,
    __redux_devtools_args: args,
  });
}
