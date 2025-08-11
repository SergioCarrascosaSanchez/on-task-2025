import { Page } from "@/shared/ui/Page/Page";
import { UserTable } from "./UserTable";
import type { User } from "@/domain/users/entities/User";
import { UsersTableHeader } from "./UsersTableHeader";
import { UserTableFilters } from "./UserTableFilters";
import { useUserTableStore } from "../stores/UserTableStore";

interface UserTableDataStateProps {
  users: User[];
  totalPages: number;
}

export function UserTableDataState({
  users,
  totalPages,
}: UserTableDataStateProps) {
  const { page, update } = useUserTableStore();
  return (
    <Page>
      <UsersTableHeader />
      <UserTableFilters />
      <UserTable
        data={users}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(page) => update({ page })}
      />
    </Page>
  );
}
