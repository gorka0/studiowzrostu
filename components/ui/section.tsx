import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "default" | "lg" | "none";
  ref?: React.Ref<HTMLElement>;
}

export function Section({
  spacing = "default",
  className,
  children,
  ref,
  ...props
}: SectionProps) {
  const spacingClasses = {
    none: "",
    sm: "py-10 md:py-14",
    default: "py-16 md:py-24",
    lg: "py-20 md:py-32",
  };

  return (
    <section
      ref={ref}
      className={cn("w-full relative content-auto", spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
