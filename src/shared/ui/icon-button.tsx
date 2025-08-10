import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "./button";

type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "variant" | "children"
> & {
  icon: React.ReactNode;
};

function IconButton({ icon, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      data-slot="icon-button"
      className={cn(
        buttonVariants({ size: "icon", variant: "outline" }),
        "h-8 w-8",
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}

export { IconButton };
