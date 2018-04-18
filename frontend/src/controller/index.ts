export type Reducer<S = any> = (state: Readonly<S>) => Readonly<S>;
export type Dispatch<S = any> = (reducer: Reducer<S>) => void;
export type Listener<S = any> = (state: S, dispatch: Dispatch<S>) => void;
export type Plugin<S = any> = (reducer: Reducer<S>) => Reducer<S>;

export class Controller<S = any> {
  private state: S;
  private plugins: Plugin<S>[] = [];
  private listeners: Listener<S>[] = [];

  constructor(initialState: S) {
    this.state = initialState;
  }

  public getState = () => this.state;

  public addPlugin(plugin: Plugin<S>) {
    this.plugins.push(plugin);
  }

  public removePlugin(plugin: Plugin<S>) {
    this.plugins = this.plugins.filter(p => p !== plugin);
  }

  public addListener(listener: Listener<S>) {
    this.listeners.push(listener);
  }

  public removeListener(listener: Listener<S>) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  public dispatch = (reducer: Reducer<S>) => {
    this.plugins.forEach(p => (reducer = p(reducer)));
    const result = reducer(this.state);
    // important: state should be immutable
    if (this.state !== result) {
      this.state = result;
      this.listeners.forEach(l => l(this.state, this.dispatch));
    }
  };
}
