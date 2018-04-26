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
  const directions: string[] = [];
  const lines = text.split("\n");
  for (let l of lines) {
    // Any line that starts with "* ", "- ", or "1. " is a new step.
    const m = /^(\*|\-|(?:\d+\.?)) (.*)/.exec(l);
    if (m) {
      directions.push(m[2]);
    } else {
      directions[directions.length - 1] += "\n" + l;
    }
  }
  return directions.map(l => l.trim()).filter(l => l);
}
