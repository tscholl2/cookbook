import { shallowCompare } from "./shallow-compare";
import * as test from "tape";

test("test shallow compare", t => {
  const o1 = { count: 0 };
  const o2 = { count: 0 };
  t.ok(shallowCompare(o1, o2));
  t.ok(shallowCompare(o1, o1));
  const o3 = { count: 1 };
  t.notOk(shallowCompare(o1, o3));
  const o4 = { notCount: 0 };
  t.notOk(shallowCompare(o1, o4));
  const o5 = { count: 0, foo: "bar" };
  t.notOk(shallowCompare(o1, o5));
  t.end();
});
