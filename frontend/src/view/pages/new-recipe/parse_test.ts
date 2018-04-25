import { test } from "tape";
import { parse } from "./parse";

test("parse recipe", t => {
  const s = `# PB&J Sandwich

Servings: 1
Author: anonymous
Time: 1 hr

# Ingrediants

- 2 tbs pb
- 2 tbs jam
- 2 slices of bread

# Directions

1. slice bread
2. fix sandwich`;
  t.doesNotThrow(() => parse(s));
  const r = parse(s);
  t.deepEqual(r.name, "PB&J Sandwich");
  t.deepEqual(r.servings, 1);
  t.deepEqual(r.ingredients.length, 3);
  t.deepEqual(r.directions, "1. slice bread\n2. fix sandwich");
  t.end();
});
