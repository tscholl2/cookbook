import * as Superfine from "superfine";
import { Controller, Dispatch } from "../src/controller";

export interface Sample {
  name: string;
  render(root: Element): void;
}

export const samples: {
  [key: string]: Sample & { filename: string }
} = {};

export function _addSampleFilename(filename: string) {
  Object.keys(samples).forEach(k => (samples[k].filename = samples[k].filename || filename));
}

function _addSample(name: string, render: (root: Element) => void) {
  samples[name] = { name, render, filename: "" };
}

export function addStatelessSample(name: string, view: () => JSX.Element) {
  addStatefullSample(name, undefined, () => view);
}

export const addSample = addStatelessSample;

export function addStatefullSample<S>(
  name: string,
  initialState: S,
  view: (dispatch: Dispatch<S>) => (state: S) => JSX.Element,
) {
  _addSample(name, root => {
    const controller = new Controller(initialState);
    const v = view(controller.dispatch);
    const listener = (state: S) => {
      const vdom = v(state)
      Superfine.patch(root, Array.isArray(vdom) ? <div>{vdom}</div> : vdom);
    };
    controller.addListener(listener);
    controller.addListener(s =>
      history.pushState(
        {},
        document.title,
        `${location.pathname}${location.search}#${btoa(encodeURI(JSON.stringify(s)))}`,
      ),
    );
    const hash = window.location.hash.substr(1);
    if (hash !== "") {
      controller.dispatch(() => JSON.parse(decodeURI(atob(hash))));
    }
    listener(controller.getState());
  });
}
