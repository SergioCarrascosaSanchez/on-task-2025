import type { User } from "@/domain/users/entities/User";
import { Table, TableBody } from "@/shared/ui/table";
import { UserTableRow } from "./UserTableRow";
import { UserTableHeader } from "./UserTableHeader";
import { Pagination } from "@/shared/ui/pagination";

interface UserTableProps {
  data: User[];
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export function UserTable({
  data,
  currentPage,
  totalPages,
  onPageChange,
}: UserTableProps) {
  return (
    <div>
      <Table>
        <UserTableHeader />
        <TableBody>
          {data.map((user) => (
            <UserTableRow user={user} key={user.id} />
          ))}
        </TableBody>
      </Table>
      <Pagination
        totalPages={totalPages}
        page={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
