import { State } from "src/model";
import { go } from "src/utils/history";
import { set } from "icepick";

export interface Route {
  path: string;
  data: any;
  title: string;
}

export const goTo = (path = "", data: any = {}, title = "") => (s: State) =>
  set(s, "route", go({ path, data, title }) as State["route"]);
