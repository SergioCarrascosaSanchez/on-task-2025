import type { User } from "@/domain/users/entities/User";
import { Table, TableBody } from "@/shared/ui/table";
import { UserTableRow } from "./UserTableRow";
import { UserTableHeader } from "./UserTableHeader";

interface UserTableProps {
  data: User[];
}

export function UserTable({ data }: UserTableProps) {
  return (
    <Table>
      <UserTableHeader />
      <TableBody>
        {data.map((user) => (
          <UserTableRow user={user} />
        ))}
      </TableBody>
    </Table>
  );
}
