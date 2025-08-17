import { UserIcon } from "lucide-react";
import { Typography } from "../Typography";

interface SidebarAccountItemProps {
  isExtended: boolean;
}

export function SidebarAccountItem({ isExtended }: SidebarAccountItemProps) {
  return (
    <div className="flex gap-3 mb-4 items-center">
      <div className="rounded-full border-muted-900 p-0.5 grid place-content-center border-solid border-1">
        <div className="rounded-full bg-blue-100/80 p-3">
          <UserIcon className="size-6" />
        </div>
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
