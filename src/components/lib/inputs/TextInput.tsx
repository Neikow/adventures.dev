import React from "react";

export const TextInput = React.forwardRef(function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>,
) {
  return <input type="text" ref={ref} {...props} />;
});
