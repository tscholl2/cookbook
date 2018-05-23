import { h } from "src/view/h";
import { addStatelessSample, addStatefullSample } from "src/sample";

function Counter({ count = 0, onClick = (): void => undefined }) {
  return (
    <div>
      <h1>Counter</h1>
      <button onclick={onClick}>↑</button>
      <h2>{count}</h2>
    </div>
  );
}

addStatefullSample("counter", 0, dispatch => state => (
  <Counter count={state} onClick={() => dispatch(() => state + 1)} />
));

addStatelessSample("paragraph", () => <p>this is a paragraph</p>);
