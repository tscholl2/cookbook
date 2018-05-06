import { Ingredient } from "src/api";

/**
 * Takes a line of text and returns the best interpretation of an ingrediant it can,
 * in a mostly-normalized way. Will throw if it can't do it.
 */
export function parseIngrediant(line: string): Ingredient {
  line = line.toLowerCase().trim();
  const amountMatch = /^(\d+\s*\d+\/\d+|\d+\/\d+|\d+)/.exec(line);
  if (amountMatch == null) {
    throw new Error("please enter an amount like '1', '1/2', '1 2/3'");
  }
  const amount = amountMatch[1].replace(/\s+/, " ");
  line = line.substr(amountMatch[0].length);
  line = line.trim();
  if (line.startsWith("/")) {
    throw new Error("unfinished fraction");
  }
  const measurementMatch = /^([A-Za-z]+)/.exec(line);
  if (measurementMatch == null) {
    throw new Error("no measurement found (e.g. 'cups')");
  }
  const measurement = measurementMatch[1];
  line = line.substr(measurementMatch[0].length);
  line = line.trim();
  const name = line;
  if (!name) {
    throw new Error("no name found (e.g. 'oats')");
  }
  return { name, amount, measurement };
}
