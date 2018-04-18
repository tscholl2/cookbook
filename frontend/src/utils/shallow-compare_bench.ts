import { Suite } from "benchmark";
import { shallowCompare } from "src/utils/shallow-compare";

function shallowCompare2(a: any = {}, b: any = {}) {
  if (a === b) {
    return true;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  for (const key in b) {
    if (!a.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

const obj = newSampleObject([100]);
const objEqual = { ...obj };
const objFirstKeyDifferent = { ...obj, [Object.keys(obj)[0]]: "different" };
const objLastKeyDifferent = { ...obj, [Object.keys(obj).pop()!]: "different" };

new Suite()
  .add("shallowCompare (Object.keys) equal", () => {
    shallowCompare(obj, objEqual);
  })
  .add("shallowCompare (Object.keys) first key is different", () => {
    shallowCompare(obj, objFirstKeyDifferent);
  })
  .add("shallowCompare (Object.keys) last key is different", () => {
    shallowCompare(obj, objLastKeyDifferent);
  })
  .add("shallowCompare (for-in loop) equal", () => {
    shallowCompare2(obj, objEqual);
  })
  .add("shallowCompare (for-in loop) first key is different", () => {
    shallowCompare2(obj, objFirstKeyDifferent);
  })
  .add("shallowCompare (for-in loop) last key is different", () => {
    shallowCompare2(obj, objLastKeyDifferent);
  })
  .on("cycle", event => {
    console.log(String(event.target));
  })
  .run({ async: false });

function newSampleObject(sizes: number[] = []) {
  if (sizes.length === 0) {
    const x = Math.random();
    if (x < 0.3) {
      return Math.random() < 0.5;
    }
    if (x < 0.6) {
      return `${Math.random()}`;
    }
    return Math.random();
  }
  const obj: any = {};
  for (let i = 0; i < sizes[0]; i++) {
    obj[`k${i}`] = newSampleObject(sizes.slice(1));
  }
  return obj;
}
