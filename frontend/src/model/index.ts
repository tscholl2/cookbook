export interface State
  extends Readonly<{
      count: number;
    }> {}

export const initialState: State = {
  count: 0,
};
