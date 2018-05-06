import { render } from "ultradom";
import { View } from "src/view";
import { Controller } from "src/controller";
import { initialState, State } from "src/model";
import { getStateFromPath } from "src/model/router";
import { debounce } from "src/utils/debounce";
import { connectControllerToHistory } from "src/controller/history";
import { connectControllerToReduxDevtools } from "src/controller/redux-devtools";
import { set } from "icepick";
import { getCurrentRoute } from "./utils/history";

declare const window: any;

function start(state = initialState) {
  const controller = new Controller(state);
  connectControllerToHistory(controller, route => state =>
    set(state, "route", route as State["route"]),
  );
  // To intialize routing based off initial URL.
  const route = getCurrentRoute();
  route.data = getStateFromPath(route.path);
  controller.dispatch(state => set(state, "route", route));
  // Devtools
  connectControllerToReduxDevtools(controller);
  // TODO: delete
  controller.addListener(state => console.log("new state", state));
  // persist state in window for hot reloading
  controller.addListener(state => (window["state"] = state));
  // Render loop
  const v = View(controller.dispatch);
  const update = debounce(() => render(v(controller.getState()), document.body));
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
