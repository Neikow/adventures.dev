import React from "react";
import { twMerge } from "tailwind-merge";

export const Button = React.forwardRef(function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { className, ...rest } = props;

  return (
    <button
      className={twMerge(
        "font-mono disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});
