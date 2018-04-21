import { Reducer, Dispatch } from "src/controller";
import { set } from "icepick";
import { actions as routerActions } from "src/model/router";
import { actions as apiActions } from "src/model/api";
import { State } from "src/model";

export const actions = {
  router: { goTo: slice("route", routerActions.goTo) },
  api: { downloadAllRecipes: sliceBind("api", apiActions.downloadAllRecipes) },
};

function slice<K extends keyof State>(a: () => Reducer<State[K]>, k: K): () => Reducer<State>;
function slice<K extends keyof State, T1>(
  k: K,
  a: (p1: T1) => Reducer<State[K]>,
): (p1: T1) => Reducer<State>;
function slice<K extends keyof State, T1, T2>(
  k: K,
  a: (p1: T1, p2: T2) => Reducer<State[K]>,
): (p1: T1, p2: T2) => Reducer<State>;
function slice<K extends keyof State, T1, T2, T3>(
  k: K,
  a: (p1: T1, p2: T2, p3: T3) => Reducer<State[K]>,
): (p1: T1, p2: T2, p3: T3) => Reducer<State>;
function slice<K extends keyof State, T1, T2, T3, T4>(
  k: K,
  a: (p1: T1, p2: T2, p3: T3, p4: T4) => Reducer<State[K]>,
): (p1: T1, p2: T2, p3: T3, p4: T4) => Reducer<State>;
function slice(k: any, a: any): any {
  return (...args: any[]) => sliceReducer(k)(a(...args));
}

function sliceBind<K extends keyof State, T>(
  k: K,
  b: (dispatch: Dispatch<State[K]>) => () => T,
): (dispatch: Dispatch<State>) => () => T;
function sliceBind<K extends keyof State, T, T1>(
  k: K,
  b: (dispatch: Dispatch<State[K]>) => (p1: T1) => T,
): (dispatch: Dispatch<State>) => (p1: T1) => T;
function sliceBind<K extends keyof State, T, T1, T2>(
  k: K,
  b: (dispatch: Dispatch<State[K]>) => (p1: T1, p2: T2) => T,
): (dispatch: Dispatch<State>) => (p1: T1, p2: T2) => T;
function sliceBind(k: any, b: any): any {
  return (d: any) => (...args: any[]) => b((r: any) => d(sliceReducer(k)(r)))(...args);
}

function sliceReducer<K extends keyof State>(k: K): (r: Reducer<State[K]>) => Reducer<State> {
  return r => state => set(state, k, r(state[k] as any) as any);
}
