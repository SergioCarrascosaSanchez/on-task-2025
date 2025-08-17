import { Moon, Settings, Sun } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { Switch } from "../switch";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { useTheme } from "@/shared/theme/ThemeProvider";

interface SidebarSettings {
  isExtended: boolean;
}

export function SidebarSettings({ isExtended }: SidebarSettings) {
  const { setTheme, theme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full">
          <SidebarItem
            isActive={false}
            onClick={() => {}}
            label="Settings"
            icon={Settings}
            isExtended={isExtended}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-40">
        <div className="flex items-center gap-3">
          <Moon className="size-5" />
          <Switch
            checked={theme === "light"}
            onCheckedChange={(checked) => {
              setTheme(checked ? "light" : "dark");
            }}
            aria-label="Toggle light / dark"
          />
          <Sun className="size-5" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
