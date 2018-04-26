/**
 * Takes a block of text that looks kinda like
 * """
 * 1. do a thing
 * 2. do another thing
 * """
 * and returns a list
 * [
 *  "do a thing",
 *  "do another thing",
 * ]
 */
export function parseDirections(text: string) {
  const directions = [];
  while (true) {
    const arr = re.exec(text);
    if (arr == null) {
      break;
    }
    directions.push(arr[1].trim());
    text = text.substr(arr[0].length);
  }
  return directions;
}

const itemStart = "(?:\\*|\\-|\\d+\\.?)"; // yes this allows *. but w/e
const re = new RegExp(`^${itemStart}([^${itemStart}]*)`, "m");
