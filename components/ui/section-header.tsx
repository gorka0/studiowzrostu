import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "h1" | "h2" | "h3";
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  as: HeadingTag = "h2",
  title,
  description,
  align = "center",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 md:mb-16",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        "max-w-3xl",
        className
      )}
      {...props}
    >
      <HeadingTag className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-heading">
        {title}
      </HeadingTag>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
