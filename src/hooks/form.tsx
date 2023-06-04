import {
  FormEventHandler,
  MouseEventHandler,
  ReactEventHandler,
  useCallback,
  useState,
} from "react";

type FormValidationResult = {
  result: "ok" | "reject" | "warn";
  message?: string | null;
};
type FormValidator<V extends object> = (
  id: keyof V,
  value: string
) => FormValidationResult;

export function useForm<V extends object>(
  initialValues: V,
  onSubmit: (values: V) => Promise<any>,
  validator?: FormValidator<V>
) {
  const [inputValues, setInputValues] = useState<V>(initialValues);
  const [inputErrors, setInputErrors] = useState<
    Partial<Record<keyof V, FormValidationResult>>
  >({});
  const [loadingOnSubmit, setLoadingOnSubmit] = useState<boolean>(false);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (Object.values(inputErrors).filter(o => o).length) {
        return;
      }

      setLoadingOnSubmit(true);
      onSubmit(inputValues).finally(() => {
        setLoadingOnSubmit(false);
      });
    },
    [inputValues, onSubmit]
  );

  const handleSetValue = useCallback((id: keyof V, value: string): boolean => {
    // Validation
    const inputError = validator && validator(id, value);
    if (inputError) {
      if (inputError.result !== "ok") {
        setInputErrors((o) => ({
          ...o,
          [id]: inputError,
        }));
        return true;
      } else {
        setInputErrors((o) => ({
          ...o,
          [id]: undefined,
        }))
      }
    }

    if (inputError?.result === "reject") {
      return false;
    }

    return true;
  }, []);

  const handleValueChanged: ReactEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const id = e.currentTarget.name as keyof V;
      const value = e.currentTarget.value;

      const res = handleSetValue(id, value);

      if (!res) {
        e.preventDefault();
      }

      console.log(inputErrors);

      setInputValues((o) => ({
        ...o,
        [id]: value,
      }));
    },
    [validator]
  );

  return {
    inputValues,
    inputErrors,
    handleValueChanged,
    handleOnSubmit,
    loadingOnSubmit,
  };
}
