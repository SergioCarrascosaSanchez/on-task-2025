import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  required?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

function Input({
  className,
  type,
  label,
  error,
  required = false,
  iconStart,
  iconEnd,
  ...props
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            hasError && "text-destructive"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <div className="relative w-full">
        {iconStart && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {iconStart}
          </span>
        )}

        <input
          type={type}
          data-slot="input"
          aria-invalid={hasError}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            hasError && "border-destructive focus-visible:ring-destructive/20",
            iconStart ? "pl-9" : "pl-3",
            iconEnd ? "pr-9" : "pr-3",
            className
          )}
          {...props}
        />

        {iconEnd && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {iconEnd}
          </span>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export { Input };
