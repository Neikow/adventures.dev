"use client";

import { useRouter } from "next/navigation";
import React from "react";

export const BackButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function BackButton(props, ref) {
  const { back } = useRouter();

  return (
    <button {...props} ref={ref} onClick={back}>
      {"< Back"}
    </button>
  );
});
