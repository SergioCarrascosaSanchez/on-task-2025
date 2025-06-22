import type { User } from "@/domain/users/entities/User";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { USER_TABLE_HEADER } from "../constants/UserTableHeader";

interface UserTableProps {
  data: User[];
}

export function UserTable({ data }: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {USER_TABLE_HEADER.map((label) => (
            <TableHead className="w-[100px]">{label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.fullName}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
