import { patch } from "ultradom";
import { View } from "src/view";
import { Controller } from "src/controller";
import { initialState, State } from "src/model";

declare const window: any;

function start(state = initialState) {
  const controller = new Controller<State>(state);
  // persist state in window for hot reloading
  controller.addListener(state => (window["state"] = state));
  const v = View(controller.dispatch);
  const root = document.getElementById("root");
  patch(v(controller.getState()), root);
  const update = () => patch(v(controller.getState()), root); // TODO: debounce
  controller.addListener(update);
  setTimeout(update, 100);
}

declare const module: any;
declare const process: any;
if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept(() => start(window["state"]));
  module.hot.dispose(() => (document.body.innerHTML = ""));
}

// this is run only 1x when the app first starts
if (!window["__already_loaded__"]) {
  window["__already_loaded__"] = true;
  start();
}
