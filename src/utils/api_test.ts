import * as api from "./api";
import * as test from "tape";

test("test API", async t => {
  let A: any;
  await t.doesNotThrow(async () => (A = await api.load("")));
  t.ok(A.length > 0);
  const n = A.length;
  A.push({
    title: "water",
    ingrediants: ["water"],
    directions: ["done"]
  });
  await t.doesNotThrow(async () => (A = await api.save("", A)));
  await t.doesNotThrow(async () => (A = await api.load("")));
  t.equals(A.length, n + 1);
  t.end();
});
