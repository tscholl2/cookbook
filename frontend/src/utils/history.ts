import { shallowCompare } from "src/utils/shallow-compare";

export interface Route {
  path: string;
  data: any;
  title: string;
}

export function go({ path = "", data = {}, title = "" }: Route): Route {
  const route = getCurrentRoute();
  if (route.path !== path || route.title !== title || !shallowCompare(route.data, data)) {
    history.pushState(Object.assign(data), title, path);
    window && window.scrollTo && window.scrollTo(0, 0); // TODO: is this right?
  }
  return { path, data, title };
}

export function getCurrentRoute(): Route {
  return {
    path: window.location.pathname + window.location.search + window.location.hash,
    data: history.state || {},
    title: document.title,
  };
}
