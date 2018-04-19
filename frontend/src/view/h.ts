import { h as ultraH } from "ultradom";

export const h: typeof ultraH = (name: any, attributes: any, ...children: any[]) => {
  return typeof name === "function"
    ? name(attributes, children)
    : ultraH(name, attributes, children);
};
