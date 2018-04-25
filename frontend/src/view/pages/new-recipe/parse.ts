import { Recipe } from "src/model/api";
import { parseIngrediant } from "src/utils/parse-ingrediant";

export function parse(text = ""): Recipe {
  const d = /#\s*directions\s*([^#]*)/gim.exec(text);
  if (d == null) {
    throw new Error("no directions given");
  }
  const directions = d[1].trim();
  const i = /#\s*ingredi[ae]nts\s*([^#]*)/gim.exec(text);
  if (i == null) {
    throw new Error("no ingrediants given");
  }
  const ingredients = i[1]
    .split("\n")
    .map(l => l.trim())
    .map(l => /^[\-\*]?(.*)$/.exec(l)![1].trim())
    .filter(l => l)
    .map(parseIngrediant);
  const a = /#(.*)/.exec(text);
  if (a == null) {
    throw new Error("no name given");
  }
  const name = a[1].trim();
  const m = /#[^\n]*\n([^#]*)/gm.exec(text);
  if (m == null) {
    throw new Error("no meta found");
  }
  if (!/^\s*servings\s*[:=]\s*([^\s]*)\s*/gim.test(m[1])) {
    throw new Error("no servings given");
  }
  const servings = parseFloat(/^\s*servings\s*[:=]\s*([^\s]*)\s*/gim.exec(m[1])![1].trim());
  if (!/^\s*(?:author|source)\s*[:=]\s*([^\s]*)\s*/gim.test(m[1])) {
    throw new Error("no author given");
  }
  const author = /^\s*(?:author|source)\s*[:=]\s*([^\s]*)\s*/gim.exec(m[1])![1].trim();
  if (!/^\s*time\s*[:=]\s*([^\s]*)\s*/gim.test(m[1])) {
    throw new Error("no total time given");
  }
  const totalTime = /^\s*time\s*[:=]\s*([^\s]*)\s*/gim.exec(m[1])![1].trim();
  return {
    id: "new",
    name,
    author,
    servings,
    totalTime,
    ingredients,
    directions,
    images: [],
    lastEdited: new Date().toJSON(),
    datePublished: new Date().toJSON(),
  };
}
