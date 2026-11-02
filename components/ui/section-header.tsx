import * as React from "react";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/effects/reveal-heading";

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
        "flex flex-col mb-6 sm:mb-8 md:mb-12",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        "max-w-3xl",
        className
      )}
      {...props}
    >
      {HeadingTag === "h1" ? (
        <h1 className="text-[clamp(1.75rem,7vw,2.25rem)] font-bold tracking-tight text-foreground font-heading leading-tight">
          {title}
        </h1>
      ) : (
        <RevealHeading
          as={HeadingTag}
          text={title}
          className="text-[clamp(1.75rem,7vw,2.25rem)] font-bold tracking-tight text-foreground font-heading leading-tight"
        />
      )}
      {description && (
        <p className="mt-2.5 sm:mt-3 text-[15px] text-muted-foreground leading-[1.55] text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
