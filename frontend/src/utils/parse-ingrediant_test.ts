import { test } from "tape";
import { parseIngrediant } from "./parse-ingrediant";

test("test ingrediant parser", t => {
  t.doesNotThrow(() => parseIngrediant("1/2 cup cheese"));
  let i = parseIngrediant("1/2 Cup cheese");
  t.deepEqual("1/2", i.amount);
  t.deepEqual("cup", i.measurement);
  t.deepEqual("cheese", i.name);

  t.throws(() => parseIngrediant("1/2 1 cup cheese"));
  t.throws(() => parseIngrediant("1/0.0 cup"));

  t.doesNotThrow(() => parseIngrediant("1/2 cup head of broccoli"));
  i = parseIngrediant("1/2 cup head of broccoli");
  t.deepEqual("1/2", i.amount);
  t.deepEqual("cup", i.measurement);
  t.deepEqual("head of broccoli", i.name);

  t.doesNotThrow(() => parseIngrediant("3       1/2 cup head of broccoli"));
  i = parseIngrediant("3 1/2 cup head of broccoli");
  t.deepEqual("3 1/2", i.amount);
  t.deepEqual("cup", i.measurement);
  t.deepEqual("head of broccoli", i.name);

  t.end();
});
