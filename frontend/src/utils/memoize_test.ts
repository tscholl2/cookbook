import { memoize } from "./memoize";
import { test } from "tape";

test("test memoize", t => {
  const obj = { count: 0 };
  const fn = (a: any) => {
    a.count++;
    return a;
  };
  const mfn = memoize(fn);
  const v1 = mfn(obj);
  const v2 = mfn(obj);
  t.deepEqual(v1, { count: 1 }, "added 1 to count");
  t.deepEqual(v2, { count: 1 }, "added 1 to count");
  t.equal(v2, v1, "returned same object");
  t.end();
});
