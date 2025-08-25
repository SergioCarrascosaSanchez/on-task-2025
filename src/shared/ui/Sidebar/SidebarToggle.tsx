import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface SidebarToggleProps {
  isExtended: boolean;
  onExtendedChange: () => void;
}

export function SidebarToggle({
  isExtended,
  onExtendedChange,
}: SidebarToggleProps) {
  const iconClasses = "stroke-subtle size-5";
  return (
    <div
      className="bg-sidebar p-2.5 rounded-lg grid place-content-center cursor-pointer absolute top-6 right-0 translate-x-1/2 translate-y-1/2"
      onClick={onExtendedChange}
    >
      {isExtended ? (
        <PanelLeftClose className={iconClasses} />
      ) : (
        <PanelLeftOpen className={iconClasses} />
      )}
    </div>
  );
}
