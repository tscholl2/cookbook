import * as Superfine from "superfine";
import { Dispatch } from "../controller";
import { State } from "../model";
import { Login } from "./login";
import { Home } from "./home";

export function App(dispatch: Dispatch<State>) {
  const login = Login(dispatch);
  const home = Home(dispatch);
  return function (state: State) {
    let Screen;
    switch (state.status) {
      case "logged in":
        Screen = home(state);
        break;
      case "logging in":
        Screen = <main><progress /></main>;
        break;
      case "not logged in":
        Screen = login(state);
        break;
    }
    return (
      <div>
        <header>HEADER</header>
          {Screen}
        <footer>FOOTER</footer>
      </div>
    );
  };
}
