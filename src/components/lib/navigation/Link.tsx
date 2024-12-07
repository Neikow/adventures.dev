import React from "react";
// eslint-disable-next-line no-restricted-imports
import { default as _Link, LinkProps as _LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

export type LinkRef = HTMLAnchorElement;
export type LinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof _LinkProps
> &
  _LinkProps;

export const Link = React.forwardRef<LinkRef, LinkProps>(
  function Link(props, ref) {
    const { href, className, ...rest } = props;

    return (
      <_Link
        href={href}
        className={twMerge("font-mono hover:underline", className)}
        {...rest}
        ref={ref}
      />
    );
  },
);
