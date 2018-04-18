declare module "benchmark" {
  export class Suite {
    public add(name: string, test: () => void): Suite;
    public on(eventName: "cycle", cb: (event: { target: any }) => void): Suite;
    public run(opt: { async: boolean }): Suite;
  }
}