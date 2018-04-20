import { shallowCompare } from "src/utils/shallow-compare";

export interface Route {
  path: string;
  data: any;
  title: string;
}

export function go({ path = "", data = {}, title = "" }: Route): Route {
  const route = getCurrentRoute();
  if (route.path !== path || route.title !== title || !shallowCompare(route.data, data)) {
    history.pushState(data, title, path);
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
