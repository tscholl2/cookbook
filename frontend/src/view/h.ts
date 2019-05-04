import { h as libH } from "superfine";

export const h: typeof libH = (name: any, attributes: any, ...children: any[]) => {
  if (typeof name === "function") {
    return name(attributes, children);
  }

  return libH(name, convertAttributesToHTML(attributes), children);
};

export function convertAttributesToHTML(attributes: any) {
  const attr: any = {};
  for (let k in attributes) {
    let v = attributes[k];
    if (k.startsWith("on")) {
      k = k.toLowerCase();
    }
    attr[k] = v;
  }
  return attr;
}
