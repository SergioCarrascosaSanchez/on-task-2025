import type { ComponentType } from "react";
import { Typography } from "../Typography";
import { cn } from "@/shared/lib/utils";

interface SidebarItemProps {
  label: string;
  icon: ComponentType<{ className?: string }>;
  onClick: () => void;
  isActive: boolean;
  isExtended: boolean;
}

export function SidebarItem({
  label,
  icon: Icon,
  isActive,
  isExtended,
  onClick,
}: SidebarItemProps) {
  const activeClasses = "bg-background";
  const inactiveClasses = "bg-transparent hover:bg-background/80";
  const commonClasses = "p-3 rounded-lg mb-2 cursor-pointer";
  const isExtendedClasses = "flex gap-2 items-center";
  const isNotExtendedClasses = "grid place-content-center";
  return (
    <div
      className={cn(
        commonClasses,
        isActive ? activeClasses : inactiveClasses,
        isExtended ? isExtendedClasses : isNotExtendedClasses
      )}
      onClick={onClick}
    >
      <Icon
        className={`size-5 ${isActive ? "stroke-foreground" : "stroke-subtle"}`}
      />
      {isExtended && (
        <Typography variant="small" className="font-medium">
          {label}
        </Typography>
      )}
    </div>
  );
}
