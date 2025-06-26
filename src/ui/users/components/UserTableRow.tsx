import type { User } from "@/domain/users/entities/User";
import { TableCell, TableRow } from "@/shared/ui/table";

interface UserTableRowProps {
  user: User;
}

export function UserTableRow({ user }: UserTableRowProps) {
  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.fullName}</TableCell>
      <TableCell>{user.email}</TableCell>
    </TableRow>
  );
}
