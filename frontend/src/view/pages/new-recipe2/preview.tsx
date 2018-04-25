import { h } from "src/view/h";
import { parse } from "./parse";

export function Preview({ text = "" } = {}) {
  let preview: JSX.Element;
  try {
    preview = <p>{JSON.stringify(parse(text))}</p>;
  } catch (e) {
    preview = <p style={{ color: "red" }}>{`${e}`}</p>;
  }
  return (
    <div>
      <h2>Preview</h2>
      {preview}
    </div>
  );
}
