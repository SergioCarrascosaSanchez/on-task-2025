import { cn } from "@/shared/lib/utils";
import { Typography } from "../Typography/Typography";
import { Avatar } from "../Avatar/Avatar";

interface SidebarAccountItemProps {
  isExtended: boolean;
}

export function SidebarAccountItem({ isExtended }: SidebarAccountItemProps) {
  const commonClasses = "mb-4";
  const isExtendedClasses = "flex gap-3 items-center";
  const isNotExtendedClasses = "grid place-content-center";
  return (
    <div
      className={cn(
        commonClasses,
        isExtended ? isExtendedClasses : isNotExtendedClasses
      )}
    >
      <div className="rounded-full border-muted-900 p-0.5 grid place-content-center border-solid border-1">
        <Avatar name={"Test User"} />
      </div>
      {isExtended && (
        <div>
          <Typography className="font-bold">Test User</Typography>
          <Typography variant="small" className="text-subtle">
            testuser@email.com
          </Typography>
        </div>
      )}
    </div>
  );
}
