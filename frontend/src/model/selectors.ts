import { State } from "./";
import { FormStatus, FormErrors } from "./forms";
import { Dispatch } from "src/controller";
import { setIn } from "icepick";
import { pathsMatcher } from "src/utils/path-matcher";
import { logReducer } from "src/controller/redux-devtools";

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
  options: {
    initialValues?: FormValues;
    validate?: (status: FormStatus<FormValues>) => FormErrors<FormValues>;
    onSubmit?: () => void | Promise<void>;
  } = {},
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
            state = setIn(state, ["forms", name, "errors"], validate(state.forms[name] as any));
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
            state = setIn(state, ["forms", name, "errors"], validate(state.forms[name] as any));
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

// TODO: move this to router.ts
export const enum PageName {
  HOME = "HOME",
  ALL_RECIPES = "ALL_RECIPES",
  RECIPE = "RECIPE",
  EDIT_RECIPE = "EDIT_RECIPE",
}

const pages = [
  { path: "/recipe/:recipeID", name: PageName.RECIPE },
  { path: "/view", name: PageName.ALL_RECIPES },
  { path: "/new", name: PageName.EDIT_RECIPE },
  { path: "*", name: PageName.HOME },
];

const pm = pathsMatcher(pages.map(a => a.path));

export function selectPageName(state: State): PageName {
  return pages[pm(state.route.path)!.index].name;
}
