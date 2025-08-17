import { FoldersIcon, UsersIcon } from "lucide-react";

import { SidebarItem } from "./SidebarItem";
import { useRouterState } from "@tanstack/react-router";
import { SidebarAccountItem } from "./SidebarAccountItem";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { SidebarToggle } from "./SidebarToggle";

export function Sidebar() {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const path = useRouterState();
  const extendedClasses = "w-80 p-10";
  const notExtendedClasses = "w-20 px-4 py-10";
  const commonClases =
    "h-screen bg-sidebar flex flex-col justify-between relative";
  return (
    <div
      className={cn(
        commonClases,
        isExtended ? extendedClasses : notExtendedClasses
      )}
    >
      <div>
        <SidebarAccountItem isExtended={isExtended} />
        <SidebarItem
          label="Users"
          icon={UsersIcon}
          route="/users/"
          isActive={path.location.pathname === "/users"}
          isExtended={isExtended}
        />
        <SidebarItem
          label="Groups"
          icon={FoldersIcon}
          route="/groups/"
          isActive={path.location.pathname === "/groups"}
          isExtended={isExtended}
        />
      </div>
      <SidebarToggle
        isExtended={isExtended}
        onExtendedChange={() => setIsExtended(!isExtended)}
      />
    </div>
  );
}
