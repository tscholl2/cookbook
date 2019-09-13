import * as Superfine from "superfine";
import { addStatelessSample, addStatefullSample } from "../samples";

addStatelessSample("p", () => <p>hello</p>)
addStatefullSample("counter", 0, (dispatch) => state => <div>
    <h1>{state}</h1><button onClick={() => dispatch(s => ++s)}>+</button>
    <button onclick={() => dispatch(s => --s)}>-</button>
</div>)