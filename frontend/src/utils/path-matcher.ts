export interface Params {
  [key: string]: string;
}
export interface RouteProps {
  params: Params;
  match: string;
}

/**
 * Given a list of routes, this will return a function
 * that matches a given path to the first possible route.
 * That function will return the index of the match
 * along with the matched parameters.
 */
export function pathsMatcher(
  routes: Array<string>,
): (path: string) => { index: number } & RouteProps | undefined {
  const matchers = routes.map(pathMatcher);
  return (path: string) => {
    for (let i = 0; i < matchers.length; i++) {
      const props = matchers[i](path);
      if (props) {
        return { index: i, ...props };
      }
    }
    return;
  };
}

/**
 * Given a route, this returns a function which matches
 * a given path to the route.
 * Example: If `route = "/foo/:id"` and `path = "/foo/123"`,
 * then the matcher should return `{id: 123}`.
 * If `path = "/bar/123"` then the matcher should return `undefined`.
 * This also allows `route = "*"`, which matches all paths
 * and has no paramaters, i.e. it always returns "{}".
 *
 * Example:
 * ```
 * const p = pathMatcher("/bar/:id1/:id2");
 * console.log(p("/bar/3/5"));
 * ```
 */
function pathMatcher(route: string): (path: string) => RouteProps | undefined {
  // Find all the parameter names in the route.
  // The `|| []` allows for `route = "*"`.
  const parameters = (route.match(/:(\w+)/g) || []).map(s => s.substr(1)); // remove the ":"
  const re = new RegExp(
    // Build a regexp to compare paths to this route by the following:
    // the path should start with the route and an optional beggening slash
    `^\\/?${route
      // escaping "/",
      .replace(/\*/g, ".*")
      // replacing parameters with "(\w+)",
      .replace(/\//g, "\\/")
      // and looking for an optional ending slash.
      .replace(/:\w+/g, "(\\w+)")}\\/?`,
  );
  return path => {
    const m = path.match(re);
    if (!m) {
      return;
    }
    // If the regexp matches the path, then it has the same number of
    // capture groups as `paramaters`. So we go through in order and
    // "zip" the lists into an object. For example, ["id"],["123"] ---> {"id":"123"}.
    // If the route has no paramaters but matches (e.g. `"*"`), then
    // the matcher will return `{}`.
    return {
      params: parameters.reduce((p, n, i) => Object.assign(p, { [n]: m[i + 1] }), {}),
      match: m[0],
    };
  };
}
