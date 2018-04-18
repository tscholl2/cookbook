import { h } from "ultradom";
import { State } from "src/model";
import { Dispatch } from "src/controller";

export const View = (dispatch: Dispatch<State>) => ({ count }: State) => (
  <div>
    <h1>Counter</h1>
    <h1>{count}</h1>
    <button onclick={() => dispatch(s => ({ count: s.count - 1 }))}>-</button>
    <button onclick={() => dispatch(s => ({ count: s.count + 1 }))}>+</button>
  </div>
);
