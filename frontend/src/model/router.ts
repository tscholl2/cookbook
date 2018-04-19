import { State } from "src/model";
import { Controller } from "src/controller";
import { shallowCompare } from "src/utils/shallow-compare";
import { set } from "icepick";

interface Route {
  path: string;
  data: any;
  title: string;
}

export const goTo = (path = "", data: any = {}, title = "") => (s: State) =>
  set(s, "route", go(path, data, title) as State["route"]);

export function connectControllerToHistory(c: Controller<State>) {
  addListener(route =>
    c.dispatch(s => set(s, "route", go(route.path, route.data, route.title) as State["route"])),
  );
  listeners[listeners.length - 1](getCurrentRoute());
}

const listeners: ((route: Route) => void)[] = [];
function addListener(listener: typeof listeners[0]) {
  listeners.push(listener);
}

addEventListener("popstate", () => listeners.forEach(l => l(getCurrentRoute())));

function go(path = "", data: any = {}, title = ""): Route {
  const route = getCurrentRoute();
  if (route.path !== path || route.title !== title || !shallowCompare(route.data, data)) {
    history.pushState(data, title, path);
  }
  return { path, data, title };
}

function getCurrentRoute(): Route {
  return {
    path: window.location.pathname + window.location.search + window.location.hash,
    data: history.state || {},
    title: document.title,
  };
}
