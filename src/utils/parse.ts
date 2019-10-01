export interface Recipe {
  title: string;
  ingrediants: string[];
  directions: string[];
}

export function parseRecipes(s: string): Recipe[] {
  if (!s.includes("#")) {
    return [];
  }
  return s
    .trim()
    .split("#")
    .splice(1)
    .map(r => `#${r.trim()}`)
    .filter(r => r != "#")
    .map(parseRecipe);
}

export function parseRecipe(s: string): Recipe {
  const chunks = s.split("\n\n");
  return {
    title: chunks[0].split("#")[1].trim(),
    ingrediants: chunks[1]
      .split("\n")
      .map(s => s.trim())
      .filter(s => s),
    directions: chunks[2]
      .split("\n")
      .map(s => s.trim())
      .filter(s => s)
  };
}

export function encodeRecipes(arr: Recipe[]): string {
  return arr.map(encodeRecipe).join("\n\n") + "\n";
}

export function encodeRecipe({
  title = "TITLE",
  ingrediants = [],
  directions = []
}: Recipe): string {
  return `# ${title}\n\n${ingrediants
    .map(s => s.trim())
    .filter(s => s)
    .join("\n")}\n\n${directions
    .map(s => s.trim())
    .filter(s => s)
    .join("\n")}`;
}

export function validate(s: string): undefined | string {
  s = s.trim();
  if (s[0] !== "#") {
    return "should start with # TITLE";
  }
  const chunks = s.split("\n\n").map(s => s.trim());
  if (chunks.length !== 3) {
    return "should have 3 sections: TITLE, INGREDIANTS, DIRECTIONS";
  }
  if (chunks[0] === "#") {
    return "title should not be empty";
  }
  if (chunks[0].includes("\n")) {
    return "title should not have a newline";
  }
  if (!chunks[1]) {
    return "missing ingrediants";
  }
  return;
}
