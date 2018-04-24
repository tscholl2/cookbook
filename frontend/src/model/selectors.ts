import { State } from "./";
import { FormStatus, FormErrors } from "./forms";
import { Dispatch } from "src/controller";
import { setIn, getIn } from "icepick";
import { logReducer } from "src/controller/redux-devtools";
import { selectPageName as pageName } from "./router";
// import { selectors as uiSelectors } from "./ui";

// forms

interface FormProps<FormValues> extends FormStatus<FormValues> {
  handleBlur(e: Event): void;
  handleChange(e: Event): void;
  handleFocus(e: Event): void;
  handleSubmit(e: Event): void;
  handleReset(): void;
}

export function createFormSelector<FormValues>(
  name: string,
  initialValues: FormValues,
  options: {
    validate?: (status: FormStatus<FormValues>) => FormErrors<FormValues>;
    onSubmit?: () => void | Promise<void>;
  } = {},
) {
  const { validate, onSubmit } = options;
  const initialForm = {
    isSubmitting: false,
    values: initialValues || {},
    errors: {},
    touched: {},
  };
  return (dispatch: Dispatch<State>) => {
    const handleReset = () =>
      dispatch(
        logReducer("form-reset", { name }, state =>
          setIn(state, ["forms", name], { values: initialValues, touched: {}, errors: {} }),
        ),
      );
    const handleBlur = (e: any) => {
      const field = e.target.name || e.target.id;
      dispatch(
        logReducer("form-blur", { name, field }, state => {
          state = setIn(state, ["forms", name, "touched", field], true);
          state = setIn(state, ["forms", name, "focus", field], false);
          if (validate) {
            state = setIn(
              state,
              ["forms", name, "errors"],
              validate({ ...initialForm, ...state.forms[name] } as any),
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
          setIn(state, ["forms", name, "focus", field], true),
        ),
      );
    };
    const handleChange = (e: any) => {
      const field = e.target.name || e.target.id;
      const value = e.target.value;
      dispatch(
        logReducer("form-change", { name, field, value }, state => {
          state = setIn(state, ["forms", name, "values", field], value);
          if (validate) {
            state = setIn(
              state,
              ["forms", name, "errors"],
              validate({ ...initialForm, ...state.forms[name] } as any),
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
            setIn(state, ["forms", name, "isSubmitting"], true),
          ),
        );
        (async () => {
          await onSubmit();
          dispatch(
            logReducer("form-end submit", { name }, state =>
              setIn(state, ["forms", name, "isSubmitting"], false),
            ),
          );
        })();
      }
    };
    return (state: State): FormProps<FormValues> => {
      return {
        handleBlur,
        handleChange,
        handleFocus,
        handleReset,
        handleSubmit,
        ...initialForm,
        ...(state.forms[name] as FormStatus<FormValues>),
      };
    };
  };
}

// Router

export function selectPageName(state: State) {
  return pageName(state.route);
}

// UI

export function selectUIValue(state: State, path: string[]) {
  return getIn(state, ["ui"].concat(path));
}
