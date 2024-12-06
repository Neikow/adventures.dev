import React from "react";

export const FileInput = React.forwardRef(function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>,
) {
  return <input type="file" ref={ref} {...props} />;
});
