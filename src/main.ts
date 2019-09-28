import * as Superfine from "superfine";
import { Controller } from "./controller";
import { App } from "./view";
import { State, initialState } from "./model";

document.addEventListener("DOMContentLoaded", () => start());

declare const module: any;
declare const process: any;
if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept(() => start());
}

function start(state: State = (window as any)["__state"] || initialState) {
  const controller = new Controller(state);
  if (process.env.NODE_ENV !== "production") {
    controller.addListener(s => console.log("STATE UPDATE", s) || s);
  }
  const view = App(controller.dispatch);
  const node = document.getElementById("app")!;
  controller.addListener(state => update(((window as any)["__state"] = state)));
  update(controller.getState());
  function update(state: State) {
    Superfine.patch(node, view(state));
  }
}
