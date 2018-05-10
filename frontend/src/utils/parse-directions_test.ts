import { test } from "tape";
import { parseDirections } from "./parse-directions";

test("test directions parser", t => {
  let text: string;
  let directions: ReturnType<typeof parseDirections>;

  text = `
1. do a thing
2. do another thing
`;
  t.doesNotThrow(() => parseDirections(text));
  directions = parseDirections(text);
  t.deepEqual(directions.length, 2);
  t.deepEqual(directions[0], "do a thing");
  t.deepEqual(directions[1], "do another thing");

  text = `
1) do a thing
2) do another thing
`;
  t.doesNotThrow(() => parseDirections(text));
  directions = parseDirections(text);
  t.deepEqual(directions.length, 2);
  t.deepEqual(directions[0], "do a thing");
  t.deepEqual(directions[1], "do another thing");

  text = `
- do a thing
- do another thing
`;
  t.doesNotThrow(() => parseDirections(text));
  directions = parseDirections(text);
  t.deepEqual(directions.length, 2);
  t.deepEqual(directions[0], "do a thing");
  t.deepEqual(directions[1], "do another thing");

  text = `
* do a thing
do another thing
`;
  t.doesNotThrow(() => parseDirections(text));
  directions = parseDirections(text);
  t.deepEqual(directions.length, 1);
  t.deepEqual(directions[0], "do a thing\ndo another thing");

  text = `
do a thing  
`;
  t.throws(() => parseDirections(text));

  t.end();
});
