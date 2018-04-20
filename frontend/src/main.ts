import { render } from "ultradom";
import { View } from "src/view";
import { Controller } from "src/controller";
import { initialState, State } from "src/model";
import { debounce } from "src/utils/debounce";
import { connectControllerToHistory } from "src/controller/history";
import { set } from "icepick";

declare const window: any;

function start(state = initialState) {
  const controller = new Controller(state);
  connectControllerToHistory(controller, route => state =>
    set(state, "route", route as State["route"]),
  );
  controller.addListener(state => console.log("new state", state));
  // persist state in window for hot reloading
  controller.addListener(state => (window["state"] = state));
  const v = View(controller.dispatch);
  const root = document.getElementById("root")!;
  render(v(controller.getState()), root);
  const update = debounce(() => render(v(controller.getState()), root));
  controller.addListener(update);
  setTimeout(update, 100);
}

declare const module: any;
declare const process: any;
if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept(() => start(window["state"]));
  // module.hot.dispose(() => (document.body.innerHTML = ""));
}

// this is run only 1x when the app first starts
if (!window["__already_loaded__"]) {
  window["__already_loaded__"] = true;
  start();
}
