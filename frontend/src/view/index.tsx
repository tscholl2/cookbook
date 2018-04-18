import { h } from "ultradom";
import { State } from "src/model";
import { Dispatch } from "src/controller";

export const View = (dispatch: Dispatch<State>) => ({ count }: State) =>
  h("div", {}, [
    h("h1", {}, count),
    h("button", { onclick: () => dispatch(s => ({ count: s.count - 1 })) }, "-"),
    h("button", { onclick: () => dispatch(s => ({ count: s.count + 1 })) }, "+"),
  ]);
