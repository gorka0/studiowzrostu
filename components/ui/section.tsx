import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "default" | "lg" | "none";
}

export function Section({
  spacing = "default",
  className,
  children,
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
      className={cn("w-full relative", spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
