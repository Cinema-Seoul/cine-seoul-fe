/* eslint-disable @typescript-eslint/ban-ts-comment */
import clsx from "clsx";
import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FormEvent,
  FormEventHandler,
  InputHTMLAttributes,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IoAlertCircle } from "react-icons/io5";

/** Context */

type FormContext = {
  values: Record<string, string>;
  errors: Record<string, boolean>;
  updateValue: (key: string, value: string) => void;
  setError: (key: string) => void;
  clearError: (key: string) => void;
};

const FormContext = createContext<FormContext>({
  values: {},
  errors: {},
  updateValue: () => {
    0;
  },
  setError: () => {
    0;
  },
  clearError: () => {
    0;
  },
});

export type FormConditionalProps = {
  render?: (context: FormContext) => ReactNode;
};

function FormConditional({ render }: FormConditionalProps) {
  const context = useContext(FormContext);

  return render ? render(context) : null;
}

export type FormInputPattern = {
  test: RegExp | ((value: string, values: Record<string, string>) => boolean);
  errorMessage?: string;
};

/* -------------------------------------------------------------------------- */
/*                                    Base                                    */
/* -------------------------------------------------------------------------- */

export type FormInputBaseProps<T = Element> = {
  inputId: string;
  patterns?: FormInputPattern | FormInputPattern[];
  required?: boolean;
  onChange?: ChangeEventHandler<T>;
};

function useFormInputBase<T = HTMLSelectElement | HTMLInputElement>({
  inputId,
  patterns: patternsRaw,
  required = false,
  onChange,
}: FormInputBaseProps<T>) {
  const formContext = useContext(FormContext);

  const [value, setValue] = useState<string>(formContext.values[inputId]);
  const [error, setError] = useState<string | null>(required ? "필수 항목이예요" : null);

  const checkValidity = (value: string): { valid: boolean; message?: string } => {
    if (value === "") {
      return required
        ? {
            valid: false,
            message: "필수 항목이예요",
          }
        : {
            valid: true,
          };
    }

    for (const { test, errorMessage } of patterns) {
      const result = typeof test === "function" ? test(value, formContext.values) : test.test(value);

      if (!result) {
        return {
          valid: false,
          message: errorMessage,
        };
      }
    }

    return {
      valid: true,
    };
  };

  useEffect(() => {
    const { valid, message = "잘못되었어요" } = checkValidity(value);
    setError(valid ? null : message);
  }, []);

  const updateContextValue = useCallback(
    (value: string) => {
      formContext.updateValue(inputId, value);
    },
    [formContext, inputId]
  );

  const updateContextError = useCallback(
    (value: boolean) => {
      if (value) {
        formContext.setError(inputId);
      } else {
        formContext.clearError(inputId);
      }
    },
    [inputId, formContext]
  );

  useEffect(() => {
    updateContextValue(value ?? "");
  }, [value]);

  useEffect(() => {
    updateContextError(error !== null);
  }, [error]);

  const patterns: FormInputPattern[] = useMemo(
    () => (patternsRaw ? (Array.isArray(patternsRaw) ? patternsRaw : [patternsRaw]) : []),
    [patternsRaw]
  );

  const onChangeValue: ChangeEventHandler<T> = (e) => {
    const value = (e.target as any)?.value;
    const { valid, message = "" } = checkValidity(value);

    setError(valid ? null : message);
    setValue(value);

    onChange && onChange(e);
  };

  return { onChangeValue, value, error };
}

/* -------------------------------------------------------------------------- */
/*                                    Input                                   */
/* -------------------------------------------------------------------------- */

export interface FormInputProps
  extends FormInputBaseProps,
    BaseProps,
    Omit<ComponentPropsWithoutRef<"input">, "defaultValue" | "pattern" | "onChange"> {
  inputClass?: string;
  label?: HTMLLabelElement | string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}

function FormInput({
  inputClass,
  label,
  className,
  inputId,
  type,
  patterns,
  onChange,
  required = false,

  //@ts-ignore
  defaultValue, //Omit
  //@ts-ignore
  pattern, //Omit
  ...restProps
}: FormInputProps) {
  const { onChangeValue, value, error } = useFormInputBase({ inputId, patterns, required, onChange });

  const labelElement = useMemo(
    () => (typeof label === "string" ? <label htmlFor={inputId}>{label}</label> : label),
    [label, inputId]
  );

  return (
    <>
      {labelElement}
      <div className={clsx(className, "flex flex-col justify-stretch relative")}>
        <input
          {...restProps}
          className={clsx(inputClass, "h-8")}
          value={value}
          onChange={onChangeValue}
          name={inputId}
          type={type}
        />
        {error && (
          <div className="flex flex-row justify-start items-center absolute bottom-0 mb--6 mt-2 text-red-7 text-sm h-4">
            <span className="text-4">
              <IoAlertCircle />
            </span>
            <span className="ml-2">{error}</span>
          </div>
        )}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Select                                   */
/* -------------------------------------------------------------------------- */

export interface FormSelectProps
  extends FormInputBaseProps,
    BaseProps,
    Omit<ComponentPropsWithoutRef<"select">, "onChange"> {
  selectClass?: string;
}

function FormSelect({
  className,
  children,
  onChange,
  inputId,
  required,
  patterns,
  selectClass,
  ...restProps
}: FormSelectProps) {
  const { onChangeValue, value, error } = useFormInputBase({ inputId, onChange, patterns, required });

  return (
    <>
      <div className={clsx(className, "flex flex-col justify-stretch relative")}>
        <select
          {...restProps}
          className={clsx(selectClass, "h-8")}
          onChange={onChangeValue}
          name={inputId}
          value={value}
        >
          {children}
        </select>
        {error && (
          <div className="flex flex-row justify-start items-center absolute bottom-0 mb--6 mt-2 text-red-7 text-sm h-4">
            <span className="text-4">
              <IoAlertCircle />
            </span>
            <span className="ml-2">{error}</span>
          </div>
        )}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  RootForm                                  */
/* -------------------------------------------------------------------------- */

export type FormSubmitFunc<T extends Record<string, string>> = (e: FormEvent<HTMLFormElement>, values: T) => void;

type FormRootPropsBase<T extends Record<string, string>> = Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> & {
  onSubmit: FormSubmitFunc<T>;
};
export type FormRootProps<T extends Record<string, string>> = FormRootPropsBase<T> & {
  initialValues: T;
};

function FormRoot<T extends Record<string, string>>({ className, children, initialValues, onSubmit, ...restProps }: FormRootProps<T>) {
  const [values, setValues] = useState<T>({
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const doOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    if (Object.values(errors).some((value) => value)) {
      e.preventDefault();
      console.log("양식 오류");
      return;
    } else {
      onSubmit && onSubmit(e, values);
    }
  };

  return (
    <FormContext.Provider
      value={{
        values,
        errors,

        updateValue: (key, value) => setValues((o) => ({ ...o, [key]: value })),
        setError: (key) => setErrors((o) => ({ ...o, [key]: true })),
        clearError: (key) => setErrors((o) => ({ ...o, [key]: false })),
      }}
    >
      <form className={className} onSubmit={doOnSubmit} {...restProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

const Form = Object.assign(FormRoot, {
  Input: FormInput,
  Select: FormSelect,
  Conditional: FormConditional,
});

export default Form;
export { FormRoot, FormInput, FormSelect, FormConditional };
