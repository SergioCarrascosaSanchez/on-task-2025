import type { ComponentType } from "react";
import { Typography } from "../Typography";
import { Link } from "@tanstack/react-router";
import { cn } from "@/shared/lib/utils";

interface SidebarItemProps {
  label: string;
  icon: ComponentType<{ className?: string }>;
  route: string;
  isActive: boolean;
  isExtended: boolean;
}

export function SidebarItem({
  label,
  icon: Icon,
  route,
  isActive,
  isExtended,
}: SidebarItemProps) {
  const activeClasses = "bg-background";
  const inactiveClasses = "bg-transparent hover:bg-background/80";
  const commonClasses = "p-3 rounded-lg mb-2";
  const isExtendedClasses = "flex gap-2 items-center";
  const isNotExtendedClasses = "grid place-content-center";
  return (
    <Link to={route}>
      <div
        className={cn(
          commonClasses,
          isActive ? activeClasses : inactiveClasses,
          isExtended ? isExtendedClasses : isNotExtendedClasses
        )}
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
    </Link>
  );
}
