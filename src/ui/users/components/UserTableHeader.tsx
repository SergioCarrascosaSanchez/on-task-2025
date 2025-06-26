import { TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { USER_TABLE_HEADER } from "../constants/UserTableHeader";

export function UserTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        {USER_TABLE_HEADER.map((label) => (
          <TableHead className="w-[100px]">{label}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
