import { shallowCompare } from "src/utils/shallow-compare";

export function memoize<T extends Function>(fn: T): T {
  const cache: { args?: any[]; value?: any } = {};
  const F: any = (...args: any[]) => {
    if (cache.args === undefined) {
      cache.args = args;
      cache.value = fn(...args);
      return cache.value;
    }
    for (let i = 0; i < args.length; i++) {
      if (!shallowCompare(args[i], cache.args[i])) {
        cache.value = fn(...args);
        break;
      }
    }
    return cache.value;
  };
  return F;
}
