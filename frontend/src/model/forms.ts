import { State } from "src/model";
import { Dispatch } from "src/controller";
import { setIn } from "icepick";

export interface FormStatus<FormValues> {
  isSubmitting: boolean;
  values: Readonly<FormValues>;
  errors: Readonly<FormErrors<FormValues>>;
  touched: Readonly<FormTouched<FormValues>>;
}
type FormErrors<FormValues> = { [K in keyof FormValues]?: string | undefined };
type FormTouched<FormValues> = { [K in keyof FormValues]?: boolean | undefined };

interface FormProps<FormValues> extends FormStatus<FormValues> {
  handleChange(e: Event): void;
  handleBlur(e: Event): void;
  handleSubmit(e: Event): void;
  handleReset(): void;
}

export function createFormSelector<FormValues>(
  name: string,
  options: {
    initialValues?: FormValues;
    validate?: (status: FormStatus<FormValues>) => FormErrors<FormValues>;
    onSubmit?: () => void | Promise<void>;
  },
) {
  const { initialValues, validate, onSubmit } = options;
  const initialForm = {
    isSubmitting: false,
    values: initialValues || {},
    errors: {},
    touched: {},
  };
  return (dispatch: Dispatch<State>) => {
    const handleReset = () =>
      dispatch(state =>
        setIn(state, ["forms", name], { values: initialValues, touched: {}, errors: {} }),
      );
    const handleBlur = (e: any) => {
      const field = e.target.name || e.target.id;
      dispatch(state => {
        state = setIn(state, ["forms", name, "touched", field], true);
        if (validate) {
          state = setIn(state, ["forms", name, "errors"], validate(state.forms[name]));
        }
        return state;
      });
    };
    const handleChange = (e: any) => {
      const field = e.target.name || e.target.id;
      const value = e.target.value;
      dispatch(state => {
        state = setIn(state, ["forms", name, "values", field], value);
        if (validate) {
          state = setIn(state, ["forms", name, "errors"], validate(state.forms[name]));
        }
        return state;
      });
    };
    const handleSubmit = (e: Event) => {
      e && e.preventDefault();
      // TODO: validate
      if (onSubmit) {
        dispatch(state => setIn(state, ["forms", name, "isSubmitting"], true));
        (async () => {
          await onSubmit();
          dispatch(state => setIn(state, ["forms", name, "isSubmitting"], false));
        })();
      }
    };
    return (state: State): FormProps<FormValues> => {
      return {
        handleBlur,
        handleChange,
        handleReset,
        handleSubmit,
        ...initialForm,
        ...(state.forms[name] as FormStatus<FormValues>),
      };
    };
  };
}
