import * as api from "./api";
import * as test from "tape";

test("test API", async t => {
  let A: any;
  await t.doesNotThrow(async () => (A = await api.load("")));
  t.equals(A.length, 3);
  A.push({
    title: "water",
    ingrediants: ["water"],
    directions: ["done"]
  });
  await t.doesNotThrow(async () => (A = await api.save("", A)));
  await t.doesNotThrow(async () => (A = await api.load("")));
  t.equals(A.length, 4);
  t.end();
});
