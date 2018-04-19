import { h } from "ultradom";
import { State } from "src/model";
import { goTo } from "src/model/router";
import { Dispatch } from "src/controller";
import { set } from "icepick";

export const View = (dispatch: Dispatch<State>) => ({ count, route: { path } }: State) => (
  <div>
    <h1>Counter</h1>
    <h1>{count}</h1>
    <h1>{path}</h1>
    <button onclick={() => dispatch(s => set(s, "count", count - 1))}>-</button>
    <button onclick={() => dispatch(s => set(s, "count", count + 1))}>+</button>
    <button onclick={() => dispatch(goTo("/page1"))}>page1</button>
    <button onclick={() => dispatch(goTo("/page2"))}>page2</button>
  </div>
);
