interface Node {
  children?: any[];
}

export function vdomStats(root: Node = {}) {
  const count = ({ children = [] }: Node): number =>
    children.reduce((p: any, n: any) => p + count(n), 1);
  const depth = ({ children = [] }: Node): number =>
    children.reduce((p: any, n: any) => Math.max(p, 1 + depth(n)), 1);
  const breadth = ({ children = [] }: Node): number =>
    Math.max(children.length, ...children.map(breadth));
  return { count: count(root), depth: depth(root), breadth: breadth(root) };
}
