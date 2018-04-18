export function shallowCompare(a: any = {}, b: any = {}) {
  if (a === b) {
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (let k of aKeys) {
    if (a[k] !== b[k]) {
      return false;
    }
  }
  return true;
}
