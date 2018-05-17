import { shallowCompare } from "src/utils/shallow-compare";

export interface Route {
  path: string;
  data: any;
  title: string;
}

declare const process: any;

export function go({ path = "", data = {}, title = "" }: Route): Route {
  const route = getCurrentRoute();
  if (route.path !== path || route.title !== title || !shallowCompare(route.data, data)) {
    if (process.env.HISTORY_MODE === "hash") {
      history.pushState(Object.assign(data), title, window.location.pathname + "#" + path);
    } else {
      history.pushState(Object.assign(data), title, path);
    }
    window && window.scrollTo && window.scrollTo(0, 0); // TODO: is this right?
  }
  return { path, data, title };
}

export function getCurrentRoute(): Route {
  if (process.env.HISTORY_MODE === "hash") {
    return {
      path: (window.location.hash.replace("#", "") || "/") + window.location.search,
      data: history.state || {},
      title: document.title,
    };
  }
  return {
    path: window.location.pathname + window.location.search + window.location.hash,
    data: history.state || {},
    title: document.title,
  };
}
