import { test } from "tape";
import { convertAttributesToHTML } from "./h";

test("convertAttributesToHTML", t => {
  t.deepEqual(
    convertAttributesToHTML({ style: { fontSize: "1em" } }),
    { style: "font-size:1em;" },
    "converts style obejct to style string",
  );
  const fn = () => undefined;
  t.deepEqual(
    convertAttributesToHTML({ onClick: fn, onTouch: fn }),
    { onclick: fn, ontouch: fn },
    "converts 'onClick' to 'onclick'",
  );
  t.end();
});
