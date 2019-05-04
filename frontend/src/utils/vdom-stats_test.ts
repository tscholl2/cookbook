import { vdomStats } from "./vdom-stats";
import * as test from "tape";

test("test vdom stats", t => {
  t.deepEqual(vdomStats({ children: [{ children: [{ children: [] }] }] }), {
    depth: 3,
    breadth: 1,
    count: 3,
  });
  t.deepEqual(vdomStats({ children: [{ children: [{ children: [] }] }, {}] }), {
    depth: 3,
    breadth: 2,
    count: 4,
  });
  t.end();
});
