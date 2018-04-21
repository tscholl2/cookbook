export interface FormStatus<FormValues> {
  isSubmitting: boolean;
  values: Readonly<FormValues>;
  errors: Readonly<FormErrors<FormValues>>;
  touched: Readonly<FormTouched<FormValues>>;
}
export type FormErrors<FormValues> = { [K in keyof FormValues]?: string | undefined };
export type FormTouched<FormValues> = { [K in keyof FormValues]?: boolean | undefined };

export type State = { [key: string]: FormStatus<any> };

export const initialState: State = {};
