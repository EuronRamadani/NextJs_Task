// src/components/ui/Button.tsx
"use client";

import { Button as AriaButton } from "react-aria-components";
import { ButtonProps } from "react-aria-components";
import { ReactNode } from "react";

interface MyButtonProps extends ButtonProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  children,
  ...props
}: MyButtonProps) {
  return (
    <AriaButton
      className={variant === "primary" ? "btn-primary" : "btn-secondary"}
      {...props}
    >
      {children}
    </AriaButton>
  );
}
