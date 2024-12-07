import {
  ErrorOption,
  FieldPath,
  FieldValues,
  UseFormSetError,
} from "react-hook-form";
import React from "react";

export type FormErrors<TFieldValues extends FieldValues = FieldValues> = Record<
  FieldPath<TFieldValues>,
  ErrorOption
>;

export function useSetErrors<TFieldValues extends FieldValues = FieldValues>(
  setError: UseFormSetError<TFieldValues>,
) {
  return React.useCallback(
    (errors?: FormErrors<TFieldValues>) => {
      if (!errors) return;
      for (const key in errors) {
        setError(
          key as keyof FormErrors<TFieldValues>,
          errors[key as keyof FormErrors<TFieldValues>],
        );
      }
    },
    [setError],
  );
}
