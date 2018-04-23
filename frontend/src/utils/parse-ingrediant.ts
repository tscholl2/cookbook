import { Ingredient } from "src/model/api";

/**
 * Takes a line of text and returns the best interpretation of an ingrediant it can,
 * in a mostly-normalized way. Will throw if it can't do it.
 */
export function parseIngrediant(line: string): Ingredient {
  const arr = ingrediant.exec(line);
  if (arr == null) {
    throw new Error("unknown ingrediant: " + line);
  }
  const m = arr[1].split("/");
  const amount = m.length > 1 ? parseFloat(m[0]) / parseFloat(m[1]) : parseFloat(m[0]);
  if (amount == +Infinity || amount < 0) {
    throw new Error("unknown amount: " + amount.toString());
  }
  const measurement = arr[2].toLowerCase();
  const name = arr[3].toLowerCase();
  return { name, amount, measurement, images: [] };
}

const number = "\\d+(?:\\.\\d*)?";
const fraction = `${number}(?:\\/${number})?`;
const measurement = "[A-Za-z]+(?:\\.)?";
const name = ".*";
const ingrediant = new RegExp(
  "^\\s*(" + fraction + ")\\s*(" + measurement + ")\\s*(" + name + ")\\s*$",
);
