import { Dispatch } from "src/controller";
import { logReducer } from "src/controller/redux-devtools";
import { setIn } from "icepick";

export interface FormStatus<FormValues> {
  isSubmitting: boolean;
  values: Readonly<FormValues>;
  errors: Readonly<FormErrors<FormValues>>;
  touched: Readonly<FormTouched<FormValues>>;
}
export type FormErrors<FormValues> = { [K in keyof FormValues]?: string | undefined };
export type FormTouched<FormValues> = { [K in keyof FormValues]?: boolean | undefined };
export interface FormProps<FormValues> extends FormStatus<FormValues> {
  handleBlur(e: Event): void;
  handleChange(e: Event): void;
  handleFocus(e: Event): void;
  handleSubmit(e: Event): void;
  handleReset(): void;
}

export type State = { [key: string]: FormStatus<any> };

export const initialState: State = {};

export function createActions(dispatch: Dispatch<State>) {
  return {
    newSelectFormProps: <FormValues>(
      name: string,
      initialValues: FormValues,
      options: {
        validate?: (status: FormStatus<FormValues>) => FormErrors<FormValues>;
        onSubmit?: (status: FormStatus<FormValues>) => void | Promise<void>;
      } = {},
    ) => {
      const { validate, onSubmit } = options;
      const initialForm = {
        isSubmitting: false,
        values: initialValues || {},
        errors: {},
        touched: {},
      };
      const handleReset = () =>
        dispatch(
          logReducer("form-reset", { name }, state =>
            setIn(state, [name], { values: initialValues, touched: {}, errors: {} }),
          ),
        );
      const handleBlur = (e: any) => {
        const field = e.target.name || e.target.id;
        dispatch(
          logReducer("form-blur", { name, field }, state => {
            state = setIn(state, [name, "touched", field], true);
            state = setIn(state, [name, "focus", field], false);
            if (validate) {
              state = setIn(
                state,
                [name, "errors"],
                validate({ ...initialForm, ...state[name] } as any),
              );
            }
            return state;
          }),
        );
      };
      const handleFocus = (e: any) => {
        e && e.preventDefault();
        const field = e.target.name || e.target.id;
        dispatch(
          logReducer("form-focus", { name, field }, state =>
            setIn(state, [name, "focus", field], true),
          ),
        );
      };
      const handleChange = (e: any) => {
        const field = e.target.name || e.target.id;
        const value = e.target.value;
        dispatch(
          logReducer("form-change", { name, field, value }, state => {
            state = setIn(state, [name, "values", field], value);
            if (validate) {
              state = setIn(
                state,
                [name, "errors"],
                validate({ ...initialForm, ...state[name] } as any),
              );
            }
            return state;
          }),
        );
      };
      const handleSubmit = (e: Event) => {
        e && e.preventDefault();
        // TODO: validate
        if (onSubmit) {
          dispatch(
            logReducer("form-start submit", { name }, state =>
              setIn(state, [name, "isSubmitting"], true),
            ),
          );
          (async () => {
            let state!: State;
            dispatch(s => (state = s)); // TODO: not a great solution
            await onSubmit(state[name]);
            dispatch(
              logReducer("form-end submit", { name }, state =>
                setIn(state, [name, "isSubmitting"], false),
              ),
            );
          })();
        }
      };
      return (state: State): FormProps<FormValues> => {
        const status: FormStatus<FormValues> = {
          ...initialForm,
          ...(state[name] as FormStatus<FormValues>),
        };
        return { handleBlur, handleChange, handleFocus, handleReset, handleSubmit, ...status };
      };
    },
  };
}
