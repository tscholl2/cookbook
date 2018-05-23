import { h as ultraDomH } from "ultradom";

export const h: typeof ultraDomH = (name: any, attributes: any, ...children: any[]) => {
  if (typeof name === "function") {
    return name(attributes, children);
  }

  return ultraDomH(name, convertAttributesToHTML(attributes), children);
};

export function convertAttributesToHTML(attributes: any) {
  const attr: any = {};
  for (let k in attributes) {
    let v = attributes[k];
    if (k.startsWith("on")) {
      k = k.toLowerCase();
    } else if (k === "style" && typeof v === "object") {
      let s = "";
      for (let property in v) {
        s += `${camelCaseToHyphenFormat(property)}:${v[property]};`;
      }
      v = s;
    }
    attr[k] = v;
  }
  return attr;
}

function camelCaseToHyphenFormat(propertyName: string) {
  return propertyName.replace(/[A-Z]/g, match => "-" + match.toLowerCase());
}
