/* eslint-disable @typescript-eslint/ban-ts-comment */
import clsx from "clsx";
import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ExoticComponent,
  FormEvent,
  FormEventHandler,
  Fragment,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  Reducer,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
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
  render?: (context: FormContext) => ReactElement;
};

function FormConditional({ render }: FormConditionalProps) {
  const context = useContext(FormContext);

  return render ? render(context) : null;
}

export type FormInputPattern = {
  test: RegExp | ((value: string, values: Record<string, string>) => boolean);
  errorMessage?: string;
};

export interface FormInputProps
  extends BaseProps,
    Omit<ComponentPropsWithoutRef<"input">, "defaultValue" | "pattern"> {
  inputClass?: string;
  label?: HTMLLabelElement | string;
  inputId: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  patterns?: FormInputPattern | FormInputPattern[];
}

function FormInput({
  inputClass,
  label,
  className,
  inputId,
  type,
  patterns: patternsRaw,
  onChange,
  required = false,

  //@ts-ignore
  defaultValue, //Omit
  //@ts-ignore
  pattern, //Omit
  ...restProps
}: FormInputProps) {
  const formContext = useContext(FormContext);

  const [value, setValue] = useState<string>(formContext.values[inputId]);
  const [error, setError] = useState<string | null>(
    required ? "필수 항목이예요" : null
  );

  useEffect(() => {
    const { valid, message = "잘못되었어요" } = checkValidity(value);
    setError(valid ? null : message);
  }, []);

  const updateContextValue = useCallback(
    (value: string) => {
      formContext.updateValue(inputId, value);
    },
    [inputId, formContext]
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
    () =>
      patternsRaw
        ? Array.isArray(patternsRaw)
          ? patternsRaw
          : [patternsRaw]
        : [],
    [patternsRaw]
  );

  const doOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const { valid, message = "" } = checkValidity(value);

    setError(valid ? null : message);
    setValue(value);

    onChange && onChange(e);
  };

  const checkValidity = (
    value: string
  ): { valid: boolean; message?: string } => {
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
      const result =
        typeof test === "function"
          ? test(value, formContext.values)
          : test.test(value);

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

  const labelElement = useMemo(
    () =>
      typeof label === "string" ? (
        <label htmlFor={inputId}>{label}</label>
      ) : (
        label
      ),
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
          onChange={doOnChange}
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

interface FormRootPropsBase
  extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    values: Record<string, string>
  ) => void;
}
export type FormRootProps<V extends string = string> = FormRootPropsBase & {
  initialValues: Record<V, string>;
};

function FormRoot<V extends string>({
  className,
  children,
  initialValues,
  onSubmit,
  ...restProps
}: FormRootProps<V>) {
  const [values, setValues] = useState<Record<string, string>>({
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
  Conditional: FormConditional,
});

export default Form;
export { FormRoot, FormInput, FormConditional };
