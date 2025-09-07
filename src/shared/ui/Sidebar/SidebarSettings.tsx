import { Moon, Settings, Sun } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { Switch } from "../Switch/Switch";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { useTheme } from "@/shared/theme/ThemeProvider";
import { useTranslation } from "react-i18next";

interface SidebarSettings {
  isExtended: boolean;
}

export function SidebarSettings({ isExtended }: SidebarSettings) {
  const { setTheme, theme } = useTheme();
  const { t } = useTranslation("common");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full">
          <SidebarItem
            isActive={false}
            onClick={() => {}}
            label={t("sidebar.settings")}
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
