import type { User } from "@/domain/users/entities/User";
import { TableCell, TableRow } from "@/shared/ui/table";
import { Trash2 } from "lucide-react";
import { useDeleteUser } from "../hooks/useDeleteUser";

interface UserTableRowProps {
  user: User;
}

export function UserTableRow({ user }: UserTableRowProps) {
  const { isPending: isDeleting, mutate: deleteUser } = useDeleteUser();

  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.fullName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell className="flex justify-end items-center">
        <Trash2
          onClick={() => deleteUser({ user })}
          size={14}
          color={isDeleting ? "var(--muted-foreground)" : "var(--destructive)"}
        />
      </TableCell>
    </TableRow>
  );
}
