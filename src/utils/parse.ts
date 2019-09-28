import { Recipe } from "../model";

export function parseRecipes(s: string): Recipe[] {
  if (!s.includes("#")) {
    return [];
  }
  return s
    .trim()
    .split("#")
    .splice(1)
    .map(r => {
      const chunks = r.split("\n\n");
      return {
        title: chunks[0].trim(),
        ingrediants: chunks[1]
          .split("\n")
          .map(s => s.trim())
          .filter(s => s),
        directions: chunks[2]
          .split("\n")
          .map(s => s.trim())
          .filter(s => s)
      };
    });
}

export function encodeRecipes(arr: Recipe[]): string {
  return (
    arr
      .map(
        ({ title = "TITLE", ingrediants = [], directions = [] }) =>
          `# ${title}\n\n${ingrediants
            .map(s => s.trim())
            .filter(s => s)
            .join("\n")}\n\n${directions
            .map(s => s.trim())
            .filter(s => s)
            .join("\n")}`
      )
      .join("\n\n") + "\n"
  );
}
