import { patch } from "superfine";
import { View } from "./view";
import { Controller } from "./controller";
import { initialState, State } from "./model";
import { debounce } from "./utils/debounce";
import { connectControllerToHistory } from "./controller/history";
import { connectControllerToReduxDevtools } from "./controller/redux-devtools";
import { set } from "icepick";
import { getCurrentRoute, go } from "./utils/history";
import { vdomStats } from "./utils/vdom-stats";

declare const window: any;

function start(state = initialState) {
  // clear any remaining containers/content
  const controller = new Controller(state);
  connectControllerToHistory(controller, route => state =>
    set(state, "route", route as State["route"]),
  );
  // To intialize routing based off initial URL if not already loaded
  if (!window["state"]) {
    let route = getCurrentRoute();
    controller.dispatch(state => set(state, "route", route));
  }
  // Devtools
  connectControllerToReduxDevtools(controller);
  // persist state in window for hot reloading
  controller.addListener(state => (window["state"] = state));
  // Render loop
  const v = View(controller.dispatch);
  const update = debounce(() => {
    const vdomstart = performance.now();
    const nextVdom = v(controller.getState());
    const vdomend = performance.now();
    const renderstart = performance.now();
    // we need to keep vdom around after hot-reloading otherwise
    // render will attach another div
    window["vdom"] = patch(window["vdom"], nextVdom, document.body);
    const renderend = performance.now();
    console.log(
      JSON.stringify({
        vdom: { ...vdomStats(nextVdom), δms: (vdomend - vdomstart).toFixed(2) },
        dom: { δms: (renderend - renderstart).toFixed(2) },
      }),
    );
  });
  controller.addListener(update);
  setTimeout(update, 100); // TODO: cancel on hotreload
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