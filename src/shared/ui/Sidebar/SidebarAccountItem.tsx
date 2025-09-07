import { cn } from "@/shared/lib/utils";
import { Typography } from "../Typography/Typography";
import { Avatar } from "../Avatar/Avatar";

interface SidebarAccountItemProps {
  name: string;
  email: string;
  isExtended: boolean;
}

export function SidebarAccountItem({
  isExtended,
  name,
  email,
}: SidebarAccountItemProps) {
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
        <Avatar name={name} />
      </div>
      {isExtended && (
        <div>
          <Typography className="font-bold">{name}</Typography>
          <Typography variant="small" className="text-subtle">
            {email}
          </Typography>
        </div>
      )}
    </div>
  );
}
