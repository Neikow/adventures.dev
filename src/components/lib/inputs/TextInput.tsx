import React from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
  inputSize?: "default" | "xl";
  labelClassName?: string;
  errorTextClassName?: string;
}

export const TextInput = React.forwardRef(function TextInput(
  props: TextInputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const {
    errorText,
    id,
    label,
    className,
    labelClassName,
    errorTextClassName,
    inputSize = "default",
    ...rest
  } = props;

  return (
    <div className={"relative flex w-full flex-col"}>
      {label && (
        <label
          htmlFor={id}
          className={twMerge("font-mono text-sm", labelClassName)}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        ref={ref}
        className={twMerge(
          "bg-transparent font-mono outline-none",
          inputSize === "default" ? "p-2" : "mb-4 p-3 text-6xl font-normal",
          className,
        )}
        {...rest}
      />
      {errorText && (
        <div
          className={twMerge(
            "font-mono text-sm text-error",
            inputSize === "default" ? "" : "absolute bottom-2",
            errorTextClassName,
          )}
        >
          {errorText}
        </div>
      )}
    </div>
  );
});
