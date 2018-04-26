import { h } from "src/view/h";
declare const require: any;
const bear = require("./bundle.min.js");
const printer = bear.newPrinter(
  bear.newNodePrinters((tag: string, attr: any = {}, children = []) => {
    const { key } = attr;
    return h(tag, { key }, children);
  }),
);
const parser = bear.defaultParser;

export function Markdown(_: {} | null | undefined, markdown: string | string[]) {
  if (Array.isArray(markdown)) {
    markdown = markdown[0];
  }
  return printer(parser(markdown));
}
