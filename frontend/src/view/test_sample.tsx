import { h } from "src/view/h";
import { addStatelessSample, addStatefullSample } from "src/sample";

function Counter(count = 0, onClick: any) {
  return (
    <div>
      <h1>Counter</h1>
      <button onclick={onClick}>↑</button>
      <h2>{count}</h2>
    </div>
  );
}

addStatefullSample("counter", 0, dispatch => state =>
  Counter(state, () => dispatch(() => state + 1)),
);

addStatelessSample("button", () => <button>clickme</button>);
addStatelessSample("p", () => <p>paragraph</p>);
