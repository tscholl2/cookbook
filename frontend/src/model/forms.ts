import { Dispatch } from "src/controller";
import { logReducer } from "src/controller/redux-devtools";
import { setIn, chain } from "icepick";
import { shallowCompare } from "../utils/shallow-compare";

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

export interface State {
  [key: string]: FormStatus<any>;
}

export const initialState: State = {};

export function createActions(dispatch: Dispatch<State>) {
  const actions = {
    clearForm: (name: string) =>
      dispatch(logReducer("form-clear", { name }, state => setIn(state, [name], {}))),
    setForm: <FormValues>(name: string, values: FormValues) =>
      dispatch(logReducer("setForm", { name, values }, state => setIn(state, [name], { values }))),
    newSelectFormProps: <FormValues>(
      name: string,
      initialValues: FormValues,
      options: {
        validate?: (status: FormStatus<FormValues>) => FormErrors<FormValues>;
        onSubmit?: (status: FormStatus<FormValues>) => any;
      } = {},
    ) => {
      const { validate, onSubmit } = options;
      const initialForm = {
        isSubmitting: false,
        values: initialValues || {},
        errors: {},
        touched: {},
      };
      const handleValidate = () =>
        // TODO: don't run validate if values haven't
        validate
          ? dispatch(
              logReducer("validate-form", { name }, state => {
                const errors = validate({ ...initialForm, ...state[name] } as any);
                if (!shallowCompare(errors, state[name].errors)) {
                  return setIn(state, [name, "errors"], errors);
                }
                return state;
              }),
            )
          : dispatch(s => s);
      const handleReset = () =>
        dispatch(
          logReducer("form-reset", { name }, state =>
            setIn(state, [name], { values: initialValues, touched: {}, errors: {} }),
          ),
        );
      const handleBlur = (e: any) => {
        const field = e.target.name || e.target.id;
        dispatch(
          logReducer("form-blur", { name, field }, state =>
            chain(state)
              .setIn([name, "touched", field], true)
              .setIn([name, "focus", field], false)
              .value(),
          ),
        );
        return handleValidate();
      };
      const handleFocus = (e: any) => {
        e && e.preventDefault();
        const field = e.target.name || e.target.id;
        return dispatch(
          logReducer("form-focus", { name, field }, state =>
            setIn(state, [name, "focus", field], true),
          ),
        );
      };
      const handleChange = (e: any) => {
        const field = e.target.name || e.target.id;
        let value = e.target.value;
        if (e.target.type && e.target.type === "number" && value) {
          value = parseFloat(value);
        }
        dispatch(
          logReducer("form-change", { name, field, value }, state =>
            chain(state)
              .setIn([name, "touched", field], true)
              .setIn([name, "values", field], value)
              .value(),
          ),
        );
        return handleValidate();
      };
      const handleSubmit = (e: Event) => {
        e && e.preventDefault();
        let state = handleValidate();
        if (!onSubmit || (state[name].errors && hasError(state[name].errors))) {
          return state;
        }
        state = dispatch(
          logReducer("form-start submit", { name }, state =>
            setIn(state, [name, "isSubmitting"], true),
          ),
        );
        return (async () => {
          await onSubmit(state[name]);
          return dispatch(
            logReducer("form-end submit", { name }, state =>
              setIn(state, [name, "isSubmitting"], false),
            ),
          );
        })();
      };
      // Set up the initial values if haven't been set yet.
      dispatch(
        logReducer(
          "form-initialize",
          { name },
          state => (state[name] ? state : setIn(state, [name], initialForm)),
        ),
      );
      return (state: State): FormProps<FormValues> => {
        return {
          handleBlur,
          handleChange,
          handleFocus,
          handleReset,
          handleSubmit,
          values: initialForm.values,
          errors: initialForm.errors,
          touched: initialForm.touched,
          ...(state[name] as FormStatus<FormValues>),
        };
      };
    },
  };
  return actions;
}

function hasError<V>(errors: FormErrors<V>) {
  for (let key in errors) {
    if (errors[key]) {
      return true;
    }
  }
  return false;
}
