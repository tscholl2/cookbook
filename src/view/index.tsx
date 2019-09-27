import * as Superfine from "superfine";
import { Dispatch } from "../controller";
import { State } from "../model";
import { Login } from "./login";
import { Home } from "./home";

export function App(dispatch: Dispatch<State>) {
  const login = Login(dispatch);
  const home = Home(dispatch);
  return function(state: State) {
    let Screen;
    switch (state.status) {
      case "loaded":
        Screen = home(state);
        break;
      case "loading":
        Screen = <progress />;
        break;
      default:
        Screen = login(state);
        break;
    }
    return (
      <main>
        <h1>Cookbook</h1>
        {Screen}
      </main>
    );
  };
}
